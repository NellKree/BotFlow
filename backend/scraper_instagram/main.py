from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv, find_dotenv
import os
import instaloader
from crud import save_profile, save_post_and_comments
from database import init_db
from datetime import datetime
init_db()

load_dotenv(find_dotenv())
app = FastAPI(title="Instagram Scraper")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

L = instaloader.Instaloader()

INSTAGRAM_USER = os.getenv("IG_USERNAME")
if not INSTAGRAM_USER:
    raise ValueError("INSTAGRAM_USER не задан в .env")

SESSIONFILE = os.getenv("IG_SESSIONFILE")
if not SESSIONFILE:
    raise ValueError("SESSIONFILE не задан в .env")

logged_in = False

try:
    L.load_session_from_file(username=INSTAGRAM_USER, filename=SESSIONFILE)
    if L.test_login() is not None:
        logged_in = True
        print(f"✅ Сессия для {L.test_login()} успешно загружена.")
    else:
        print("⚠️ Сессия загружена, но невалидна. Возможно, срок истёк.")
except FileNotFoundError:
    print("❌ Файл сессии не найден.")
except Exception as e:
    print(f"❌ Ошибка при загрузке сессии: {e}")

@app.get("/instagram/profile")
def get_profile(username: str = Query(...)):
    if not logged_in:
        return {"error": "Не выполнен вход в Instagram"}
    try:
        profile = instaloader.Profile.from_username(L.context, username)
        data = {
            "username": profile.username,
            "full_name": profile.full_name,
            "followers": profile.followers,
            "following": profile.followees,
            "bio": profile.biography,
            "is_verified": profile.is_verified,
            "is_private": profile.is_private,
            "external_url": profile.external_url,
            "profile_pic_url": profile.profile_pic_url,
            "posts_count": profile.mediacount
        }

        save_profile(data)
        return data

    except Exception as e:
        return {"error": str(e)}


@app.get("/instagram/post")
def get_post(shortcode: str = Query(...)):
    if not logged_in:
        return {"error": "Не выполнен вход в Instagram"}

    try:
        post = instaloader.Post.from_shortcode(L.context, shortcode)

        comments = []
        for comment in post.get_comments():
            comments.append({
                "author": comment.owner.username,
                "text": comment.text,
                "created_at": comment.created_at_utc,
                "likes": comment.likes_count
            })

        post_data = {
            "shortcode": shortcode,
            "caption": post.caption,
            "likes": post.likes,
            "media_url": post.url,
            "date": post.date_utc,
            "profile_username": post.owner_username
        }

        save_post_and_comments(post_data, comments)
        return {**post_data, "comments": comments}

    except Exception as e:
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("INSTAGRAM_PORT", 8082))
    uvicorn.run("main:app", host="0.0.0.0", port=port)