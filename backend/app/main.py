# this will be the main script for my backend
# this main.py as i learned will be my entire app, 
# it will handle everything, 
# for now i will handle my ORM/database
# backend/app/main.py
from fastapi import FastAPI, HTTPException
from sqlmodel import Session, select
from contextlib import asynccontextmanager

from backend.app.core.database import create_db_and_tables, engine, User
from backend.app.api import auth_routes, journal_routes

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating Database Tables...")
    create_db_and_tables()
    print("Database tables created!")
    yield
    print("Server Shutting down...")

app = FastAPI(lifespan = lifespan)

# from api subpackage 
app.include_router(auth_routes.router, prefix = "/api")
app.include_router(journal_routes.router, prefix = "/api")

@app.get("/")
async def root():
    try:
        with Session(engine) as session:
            session.exec(select(User)).first()
        return {"Message: ": "Hello World", "Status: ": "database OK"}
    except Exception as e:
        raise HTTPException(status_code = 500, detail = f"Database ERROR: {str(e)}")        



@app.get("/health")
async def health():
    return {"status": "healthy"}