import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .database import Base, engine
from .routers import modules, admin_content


@asynccontextmanager
async def lifespan(app: FastAPI):
    # NOTE: for local dev only. Swap for Alembic migrations before production.
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="TechEdu Content Service", lifespan=lifespan)

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(modules.router)
app.include_router(admin_content.router)


@app.get("/health")
def health():
    return {"status": "ok"}
