from dotenv import load_dotenv, find_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
load_dotenv(find_dotenv())
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Вызывается при старте приложения
def init_db():
    from models import Base
    Base.metadata.create_all(bind=engine)
