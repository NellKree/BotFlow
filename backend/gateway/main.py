from dotenv import load_dotenv, find_dotenv
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from services import proxy_get
import os

load_dotenv(find_dotenv())
app = FastAPI(title="BotFlow Gateway")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Конфигурация адресов микросервисов
YOUTUBE_URL = os.getenv("SCRAPER_YOUTUBE_URL", "http://scraper_youtube:8080")
INSTAGRAM_URL = os.getenv("INSTAGRAM_URL", "http://scraper_instagram:8082")

@app.get("/status")
def read_status():
    return {"status": "OK", "message": "Gateway работает"}

@app.get("/api/youtube/comments")
async def youtube_comments(video_id: str = Query(...)):
    return await proxy_get(f"{YOUTUBE_URL}/youtube/comments", params={"video_id": video_id})

@app.get("/api/instagram/profile")
async def instagram_profile(username: str = Query(...)):
    return await proxy_get(f"{INSTAGRAM_URL}/instagram/profile", params={"username": username})

@app.get("/api/instagram/post")
async def instagram_post(shortcode: str = Query(...)):
    return await proxy_get(f"{INSTAGRAM_URL}/instagram/post", params={"shortcode": shortcode})

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("GATEWAY_PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
