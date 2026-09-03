import os
import time
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import OperationalError

logger = logging.getLogger("auth-service")

# In prod (docker-compose): mysql+pymysql://user:pass@mysql-host:3306/auth_db
# Falls back to a local SQLite file for quick local testing without MySQL running.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./auth_dev.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def wait_for_db(retries: int = 15, delay_seconds: float = 2.0):
    """Blocks until the database is actually reachable, retrying with a
    fixed delay. Needed because container orchestration "healthy" signals
    (e.g. MySQL's docker healthcheck) can report ready before the real
    server is actually accepting connections — see docker-compose.yml
    for the MySQL temp-server startup race this guards against.
    """
    last_error = None
    for attempt in range(1, retries + 1):
        try:
            with engine.connect():
                logger.info("Database reachable (attempt %d/%d)", attempt, retries)
                return
        except OperationalError as e:
            last_error = e
            logger.warning(
                "Database not ready yet (attempt %d/%d): %s", attempt, retries, e
            )
            time.sleep(delay_seconds)
    raise RuntimeError(
        f"Could not connect to the database after {retries} attempts"
    ) from last_error


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
