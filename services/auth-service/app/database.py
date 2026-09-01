import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# In prod (docker-compose): mysql+pymysql://user:pass@mysql-host:3306/auth_db
# Falls back to a local SQLite file for quick local testing without MySQL running.
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./auth_dev.db")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
