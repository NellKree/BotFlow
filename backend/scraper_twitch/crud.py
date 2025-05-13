from sqlalchemy.orm import Session
from models import TwitchMessage
from datetime import datetime
import uuid

def save_message(db: Session, channel, author, text, is_bot):
    msg = TwitchMessage(
        id=str(uuid.uuid4()),
        channel=channel,
        author=author,
        text=text,
        timestamp=datetime.utcnow(),
        is_bot=is_bot
    )
    db.add(msg)
    db.commit()

def get_last_messages(db: Session, limit=20):
    return db.query(TwitchMessage).order_by(TwitchMessage.timestamp.desc()).limit(limit).all()
