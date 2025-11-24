from sqlmodel import SQLModel

class UserCreate(SQLModel):
    # I'm not sure if the username statiate is necessary for user create since it is optional in registering a new user, 
    # but can be edited once inside the user settings/dashboard
    email : str
    password : str
    
class UserRead(SQLModel):
    id: int
    username: str
    email: str

class UserLogin(SQLModel):
    email: str
    password: str

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"