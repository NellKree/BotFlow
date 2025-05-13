from fastapi import FastAPI, Body, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from twitch_bot import bot
from crud import get_last_messages
from database import get_db
from urllib.parse import urlparse
import asyncio
import threading
from contextlib import asynccontextmanager
import os

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Twitch микросервис запущен")

    def run_bot():
        asyncio.run(bot.connect())

    threading.Thread(target=run_bot, daemon=True).start()
    yield

app = FastAPI(title="Twitch Scraper", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/twitch/start")
async def start_listening(data: dict = Body(...)):
    twitch_url = data.get("twitch_url")
    if not twitch_url:
        return {"error": "Не указан twitch_url"}
    channel = urlparse(twitch_url).path.strip("/")
    if not channel:
        return {"error": "Невалидная ссылка"}
    await bot.join_channel_dynamic(channel)
    return {"message": f"🟢 Чат канала {channel} подключен"}

@app.get("/twitch/messages")
def fetch_messages(db: Session = Depends(get_db)):
    messages = get_last_messages(db)
    return [dict(message.__dict__) for message in messages]
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("TWITCH_PORT", 8091))
    uvicorn.run("main:app", host="0.0.0.0", port=port)