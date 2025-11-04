# backend/app/core/database.py
from sqlmodel import SQLModel, Field, create_engine, Session, select
from contextlib import contextmanager
import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
dotenv_path = os.path.join(BASE_DIR, ".env")

print(f"Looking for .env at: {dotenv_path}")
print(f".env exists: {os.path.exists(dotenv_path)}")

load_dotenv(dotenv_path)

# PostgreSQL connection string from .env
DATABASE_URL = os.getenv("DATABASE_URL")
print(f"DATABASE_URL loaded: {DATABASE_URL}")

engine = create_engine(DATABASE_URL, echo = True)


class User(SQLModel, table = True):
    __tablename__ = "users"  # type: ignore
    __table_args__ = {"schema": "auth"}
    id: int | None = Field(default = None, primary_key = True)
    email: str = Field(unique = True, index = True)
    hashed_password: str


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@contextmanager
def get_session():
    with Session(engine) as Session:
        yield session