# backend/scraper_twitch/twitch_bot.py

import os
import re
import asyncio
from twitchio.ext import commands
from database import SessionLocal
from crud import save_message

class TwitchBot(commands.Bot):
    def __init__(self, loop=None):
        super().__init__(
            token=os.getenv("TWITCH_IRC_TOKEN"),
            prefix="!",
            initial_channels=[]
        )
        self.loop = loop or asyncio.get_event_loop()  # используем общий цикл

    async def join_channel_dynamic(self, channel_name: str):
        await self.join_channels([channel_name])
        print(f"🟢 Подключено к чату канала {channel_name}")

    async def event_ready(self):
        print(f"✅ Бот вошёл в Twitch как {self.nick}")

    async def event_message(self, message):
        if message.echo:
            return

        print(f"[{message.author.name}]: {message.content}")  # 👈 лог

        is_bot = self.analyze_message(message)
        db = SessionLocal()
        try:
            save_message(
                db=db,
                channel=message.channel.name,
                author=message.author.name,
                text=message.content,
                is_bot=is_bot
            )
        finally:
            db.close()

    def analyze_message(self, message):
        score = 0
        if len(message.content.strip()) < 5:
            score += 0.2
        if re.search(r"(free|follow|бот|click)", message.content.lower()):
            score += 0.3
        if re.search(r"\d{4,}", message.author.name):
            score += 0.3
        return score >= 0.4

# Экземпляр бота будет создан с правильным циклом
bot = TwitchBot()