from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from crud import get_unprocessed_comments, update_bot_status
import yaml
from data_preprocessing import DataPreprocessor
from model_training import ModelTrainer
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def is_comment_bot(text: str) -> bool:
    # 🔧 Фиктивная логика:
    if len(text.strip()) < 5:
        return True
    if text.count("!") > 3 or text.count(".") > 3:
        return True
    return False

@app.post("/detect")
def detect_bots(db: Session = Depends(get_db)):
    comments = get_unprocessed_comments(db)
    processed = 0
    # Загрузка конфигурации
    cfg = yaml.safe_load(open("config.yaml"))
    preprocessor = DataPreprocessor(cfg)
    X, y = preprocessor.run()
    trainer = ModelTrainer(cfg)
    results = trainer.train_and_evaluate()
    for comment in comments:
        is_bot = is_comment_bot(comment.text)
        update_bot_status(db, comment.id, is_bot)
        r = results
        t, j = X, y
        processed += 1

    return {"processed": processed}
