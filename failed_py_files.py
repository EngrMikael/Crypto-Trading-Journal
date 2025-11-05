# main.py

from contextlib import asynccontextmanager
from fastapi import FastAPI
from backend.app.core.database import create_db_and_tables

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield
    
app = FastAPI(lifespan = lifespan)

@app.get("/")
async def root():
    return {"message": "Hello World"}



# database.py
from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine, select
from contextlib import contextmanager
import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
dotenv_path = os.path.join(BASE_DIR, ".env")
load_dotenv(dotenv_path)

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo = True)

class User(SQLModel, table = True):
    __tablename__ = "users" #type: ignore
    __table_args__ = {"schema" : "auth"}
    id: int | None = Field(default = None, primary_key = True)
    email: str
    hashed_password: str

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
print("Database_URL: ", DATABASE_URL)