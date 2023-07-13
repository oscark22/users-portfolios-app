from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
DATABASE_TARGET = os.environ.get("DATABASE_TARGET", "localhost")

SQLALCHEMY_DATABASE_URL = (
    f"postgresql://postgres:password@{DATABASE_TARGET}:5432/postgres"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
