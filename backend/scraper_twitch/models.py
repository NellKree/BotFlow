from sqlalchemy import Column, String, DateTime, Boolean
from database import Base

class TwitchMessage(Base):
    __tablename__ = "twitch_messages"

    id = Column(String, primary_key=True)
    channel = Column(String)
    author = Column(String)
    text = Column(String)
    timestamp = Column(DateTime)
    is_bot = Column(Boolean)
