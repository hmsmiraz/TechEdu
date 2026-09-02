import os
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .telemetry import setup_telemetry
from .database import Base, engine, SessionLocal
from .models import User, UserRole, UserStatus
from .security import hash_password
from .routers import auth, admin_users

logger = logging.getLogger("auth-service")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # NOTE: for local dev only. Swap for Alembic migrations before production.
    Base.metadata.create_all(bind=engine)
    _bootstrap_admin()
    _check_jwt_secret_strength()
    yield


app = FastAPI(title="TechEdu Auth Service", lifespan=lifespan)

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(admin_users.router)
setup_telemetry(app, engine, service_name="auth-service")


def _bootstrap_admin():
    """Create a default admin user from env vars if no admin exists yet."""
    admin_email = os.getenv("ADMIN_EMAIL")
    admin_password = os.getenv("ADMIN_PASSWORD")
    if not admin_email or not admin_password:
        logger.warning(
            "ADMIN_EMAIL/ADMIN_PASSWORD not set — skipping admin bootstrap. "
            "You won't be able to log into the admin panel until an admin user exists."
        )
        return

    db = SessionLocal()
    try:
        existing_admin = db.query(User).filter(User.role == UserRole.admin).first()
        if existing_admin:
            return

        admin = User(
            name="Admin",
            email=admin_email,
            password_hash=hash_password(admin_password),
            role=UserRole.admin,
            status=UserStatus.approved,
        )
        db.add(admin)
        db.commit()
        logger.info("Bootstrapped admin user: %s", admin_email)
    finally:
        db.close()


def _check_jwt_secret_strength():
    from .security import JWT_SECRET

    if JWT_SECRET == "dev-secret-change-me":
        logger.warning(
            "JWT_SECRET is using the insecure default value. Set a real secret "
            "(e.g. `openssl rand -hex 32`) before deploying anywhere but local dev."
        )
    elif len(JWT_SECRET.encode("utf-8")) < 32:
        logger.warning(
            "JWT_SECRET is shorter than the recommended 32 bytes for HS256. "
            "Generate a stronger one with `openssl rand -hex 32`."
        )


@app.get("/health")
def health():
    return {"status": "ok"}