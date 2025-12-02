# backend/app/core/database.py
from sqlmodel import SQLModel, Field, create_engine, Session
from contextlib import contextmanager
from datetime import date
import os
from dotenv import load_dotenv

# BASE_DIR is the root folder, wherein the .env file is located
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
dotenv_path = os.path.join(BASE_DIR, ".env")

print(f"Looking for .env at: {dotenv_path}")
print(f".env exists: {os.path.exists(dotenv_path)}")

load_dotenv(dotenv_path)

# PostgreSQL connection string from .env
DATABASE_URL = os.getenv("DATABASE_URL")
print(f"DATABASE_URL loaded: {DATABASE_URL}")

engine = create_engine(DATABASE_URL, echo = True)

# my two schemas
class User(SQLModel, table = True):
    # I'm adding an option to add a username whene creating a new user, it is optional when creating the account but can be updated in the user settings/dashboard.
    __tablename__ = "users"  # type: ignore
    __table_args__ = {"schema": "auth"}
    id: int | None = Field(default = None, primary_key = True)
    email: str = Field(unique = True, index = True)
    username: str | None = None
    hashed_password: str

class Journal(SQLModel, table = True):
    __tablename__ = "journal_info" #type: ignore
    __table_args__ = {"schema": "journal"}
    id: int | None = Field(default = None, primary_key = True)
    # to establish connection/relation i must call on the User Table from auth schema
    user_id : int = Field(foreign_key = "auth.users.id")
    asset_coin : str
    value_entered : float
    value_outcome : float
    date_open : date
    date_closed : date | None = None
    note : str | None = None
    strategy : str | None = None
    p_l : bool | None = None
    
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@contextmanager
def get_session():
    with Session(engine) as session:
        yield session

# dependency for FastAPI routes
def get_session_dependency():
    with Session(engine) as session:
        yield session
