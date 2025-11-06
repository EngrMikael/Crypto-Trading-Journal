from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from backend.app.core.database import engine, User
from backend.app.model.auth_models import UserCreate
from passlib.context import CryptContext

router = APIRouter()

pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

@router.get("/users")
def list_users():
    return {"message" : "List of users coming soon"}

@router.post("/register")
def register_user(user : UserCreate):
    with Session(engine) as session:
        # check if email exists
        existing_user = session.exec(
            select(User).where(User.email == user.email)
        ).first()
        if existing_user:
            raise HTTPException(status_code = 400, detail = "Email Already exists")
        
        # create a new user with hash password
        new_user = User(
            email = user.email,
            hashed_password = hash_password(user.password)
        )
        
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        
        return {"message" : "User Succesfully Created", "user_id" : new_user.id}