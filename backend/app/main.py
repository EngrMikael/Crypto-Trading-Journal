# this will be the main script for my backend
# this main.py as i learned will be my entire app, 
# it will handle everything, 
# for now i will handle my ORM/database
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}