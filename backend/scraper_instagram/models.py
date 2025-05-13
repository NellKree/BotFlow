from sqlalchemy import Column, String, Integer, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class InstagramProfile(Base):
    __tablename__ = "instagram_profiles"

    username = Column(String, primary_key=True)
    full_name = Column(String)
    followers = Column(Integer)
    following = Column(Integer)
    bio = Column(String)
    is_verified = Column(Boolean)
    is_private = Column(Boolean)
    external_url = Column(String)
    profile_pic_url = Column(String)
    posts_count = Column(Integer)

class InstagramPost(Base):
    __tablename__ = "instagram_posts"

    shortcode = Column(String, primary_key=True)
    caption = Column(String)
    likes = Column(Integer)
    media_url = Column(String)
    date = Column(DateTime)
    profile_username = Column(String, ForeignKey("instagram_profiles.username"))

class InstagramComment(Base):
    __tablename__ = "instagram_comments"

    id = Column(Integer, primary_key=True, autoincrement=True)
    shortcode = Column(String, ForeignKey("instagram_posts.shortcode"))
    author = Column(String)
    text = Column(String)
    created_at = Column(DateTime)
    likes = Column(Integer)
