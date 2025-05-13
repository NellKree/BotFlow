from models import InstagramProfile, InstagramPost, InstagramComment
from database import SessionLocal
from datetime import datetime

def save_profile(data: dict):
    db = SessionLocal()
    profile = InstagramProfile(**data)
    db.merge(profile)
    db.commit()
    db.close()

def save_post_and_comments(post_data: dict, comments: list[dict]):
    db = SessionLocal()
    post = InstagramPost(**post_data)
    db.merge(post)
    for c in comments:
        c_obj = InstagramComment(**c, shortcode=post.shortcode)
        db.merge(c_obj)
    db.commit()
    db.close()
