import re

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from googleapiclient.discovery import build
from dotenv import load_dotenv, find_dotenv
import os
from crud import save_video_and_comments
from database import init_db
import re
load_dotenv(find_dotenv())
init_db()

app = FastAPI(title="YouTube Comment Scraper")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
if not YOUTUBE_API_KEY:
    raise ValueError("YOUTUBE_API_KEY не задан в .env")

def is_likely_bot(comment_text: str, text_length: int, like_count: int, author: str) -> bool:
    score = 0.0

    # --- Проверка длины текста ---
    if text_length < 10:
        score += 0.05
    elif text_length < 20:
        score += 0.05
    elif text_length < 40:
        score += 0.05

    # --- Проверка лайков ---
    if like_count == 0:
        score += 0.05
    elif like_count <= 2:
        score += 0.05

    # --- Проверка наличия спамных слов ---
    spam_keywords = {
        "free", "subscribe", "click", "buy", "offer", "win", "money", "cash", "prize",
        "подписывайся", "бесплатно", "заработок", "денег", "выиграй", "только сегодня",
        "получи", "скидка", "акция", "забери", "перейди", "ссылка", "telegram", "tg",
        "ютуб", "канал", "смотреть", "кликни", "здесь", "давайте", "все тут"
    }

    comment_lower = comment_text.lower()
    if any(word in comment_lower for word in spam_keywords):
        score += 0.15

    # --- Проверка наличия эмодзи в коротких сообщениях ---
    has_emoji = bool(re.search(r'[^\w\s,.!?]', comment_text))
    if has_emoji and text_length < 30:
        score += 0.075

    # --- Проверка структуры никнейма автора ---
    def has_suspicious_nickname(name: str) -> bool:
        if not name:
            return False
        name = name.lower()
        suspicious_patterns = [
            r'-[а-я][\d]',       # Например: -ь6, -п9
            r'[а-я]{3}\d',        # Например: ч6с, с4й
            r'[a-z][\d][a-z]',    # Например: a4f
            r'^[a-z].*[a-z]$',    # Только латинские буквы (часто у ботов)
            r'\d{2,}',             # Много цифр подряд
            r'[\W_]',              # Содержание спецсимволов
            r'бот|robot|spam|test|user\d+'  # Общеизвестные слова
        ]
        for pattern in suspicious_patterns:
            if re.search(pattern, name):
                return True
        if len(name) > 25:  # Очень длинные имена
            return True
        return False

    if has_suspicious_nickname(author):
        score += 0.3

    # --- Нормализация результата ---
    bot_score = min(score, 1.0)
    return bot_score >= 0.45  # Порог можно менять при необходимости

@app.get("/youtube/comments")
def get_comments(video_id: str = Query(..., description="ID YouTube-видео")):
    try:
        youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

        # Загружаем до 2000 комментариев (максимум 100 за запрос)
        result = []
        page_token = None
        max_total = 2000

        while len(result) < max_total:
            response = youtube.commentThreads().list(
                part="snippet",
                videoId=video_id,
                maxResults=100,
                textFormat="plainText",
                pageToken=page_token
            ).execute()

            for item in response.get("items", []):
                comment = item["snippet"]["topLevelComment"]["snippet"]
                text = comment["textDisplay"]
                text_length = len(text)
                like_count = comment["likeCount"]
                author = comment["authorDisplayName"]
                result.append({
                    "id": item["id"],
                    "author": comment["authorDisplayName"],
                    "profile_image_url": comment.get("authorProfileImageUrl"),
                    "text": text,
                    "published_at": comment["publishedAt"],
                    "like_count": like_count,
                    "author_channel_id": comment.get("authorChannelId", {}).get("value"),
                    "text_length": text_length,
                    "has_emoji": bool(re.search(r'[^\w\s,.!?]', text)),
                    "is_bot": is_likely_bot(text, text_length, like_count,author)
                })

                if len(result) >= max_total:
                    break  # Достигли лимита 2000

            page_token = response.get("nextPageToken")
            if not page_token:
                break

        # Получаем мета-данные о видео
        video_response = youtube.videos().list(
            part="snippet,statistics",
            id=video_id
        ).execute()

        video_info = video_response.get("items", [])[0]
        snippet = video_info["snippet"]
        stats = video_info.get("statistics", {})

        video_data = {
            "id": video_id,
            "title": snippet["title"],
            "description": snippet["description"],
            "published_at": snippet["publishedAt"],
            "channel_title": snippet["channelTitle"],
            "like_count": int(stats.get("likeCount", 0)),
            "comment_count": int(stats.get("commentCount", 0))

        }

        # Сохраняем в базу
        save_video_and_comments(video_data, result)

        return {
            "video": video_data,
            "comments": result
        }

    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("YOUTUBE_PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
