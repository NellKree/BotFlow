from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from googleapiclient.discovery import build
from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())

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

@app.get("/youtube/comments")
def get_comments(video_id: str = Query(..., description="ID YouTube-видео")):
    try:
        youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)
        response = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=10,
            textFormat="plainText"
        ).execute()

        result = []

        for item in response.get("items", []):
            comment = item["snippet"]["topLevelComment"]["snippet"]
            result.append({
                "author": comment["authorDisplayName"],
                "profileImage": comment.get("authorProfileImageUrl"),
                "text": comment["textDisplay"],
                "publishedAt": comment["publishedAt"],
                "likeCount": comment["likeCount"],
            })

        return {"video_id": video_id, "comments": result}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("YOUTUBE_PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)