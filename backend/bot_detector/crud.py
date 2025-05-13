from sqlalchemy.orm import Session
from models import YouTubeComment

def get_unprocessed_comments(db: Session, limit: int = 100):
    return db.query(YouTubeComment).filter(YouTubeComment.is_bot == None).limit(limit).all()

def update_bot_status(db: Session, comment_id: str, is_bot: bool):
    comment = db.query(YouTubeComment).filter(YouTubeComment.id == comment_id).first()
    if comment:
        comment.is_bot = is_bot
        db.commit()
