from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class YouTubeComment(Base):
    __tablename__ = 'youtube_comments'

    id = Column(String, primary_key=True)
    video_id = Column(String, ForeignKey('youtube_videos.id'))
    author = Column(String)
    text = Column(String)
    like_count = Column(Integer)
    published_at = Column(DateTime)
    profile_image_url = Column(String)
    author_channel_id = Column(String)
    text_length = Column(Integer)
    has_emoji = Column(Boolean)
    is_bot = Column(Boolean, nullable=True)
