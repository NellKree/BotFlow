from models import YouTubeVideo, YouTubeComment
from database import SessionLocal
from sqlalchemy.exc import IntegrityError

def save_video_and_comments(video_data, comments):
    db = SessionLocal()

    video = YouTubeVideo(**video_data)
    db.merge(video)

    for comment in comments:
        try:
            comment_obj = YouTubeComment(**comment, video_id=video.id)
            db.merge(comment_obj)
        except IntegrityError:
            continue

    db.commit()
    db.close()
