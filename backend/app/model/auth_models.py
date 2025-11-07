from sqlmodel import SQLModel

class UserCreate(SQLModel):
    email : str
    password : str
    
class UserRead(SQLModel):
    id: int
    email: str

class UserLogin(SQLModel):
    email: str
    password: str

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"