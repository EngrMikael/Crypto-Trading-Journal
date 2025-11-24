from sqlmodel import SQLModel

class UserCreate(SQLModel):
    # I decided to add a username but make it optional
    email : str
    username : str | None = None
    password : str
    
class UserRead(SQLModel):
    # I need to make the UserRead None username otherwise it will raise an error
    id: int
    username: str | None = None
    email: str

class UserLogin(SQLModel):
    email: str
    password: str

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"