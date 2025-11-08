from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from backend.app.core.database import engine, User, get_session
from backend.app.model.auth_models import UserCreate, UserLogin, Token
from backend.app.core.auth_utils import hash_password, verify_password, create_access_token
from passlib.context import CryptContext

router = APIRouter()

@router.get("/users")
def list_users():
    return {"message" : "List of users coming soon"}

# this is my register user route
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

# this is my login route
@router.post("/login", response_model = Token)
def login(user: UserLogin):
    with Session(engine) as session:
        db_user = session.exec(select(User).where(User.email == user.email)).first()
        if not db_user or not verify_password(user.password, db_user.hashed_password):
            raise HTTPException(status_code = 401, detail = "Invalid Credentials")
        
        token = create_access_token({"sub" : str(db_user.id)})
        return Token(access_token = token, token_type = "bearer")