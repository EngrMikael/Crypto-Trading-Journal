from typing import Annotated
from sqlmodel import Field, Session, SQLModel, create_engine, select
from contextlib import contextmanager
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("no_info_yet")

engine = create_engine(DATABASE_URL, echo = True)