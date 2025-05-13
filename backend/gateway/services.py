# backend/gateway/services.py

import httpx
from fastapi import HTTPException

async def proxy_get(url: str, params: dict = None):
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Ошибка соединения: {e}")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Ошибка от сервиса: {e.response.text}")

async def proxy_post(url: str, json: dict = None):
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(url, json=json)
        response.raise_for_status()
        return response.json()
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Ошибка соединения: {e}")
    except httpx.HTTPStatusError as e:
        raise HTTPException(status_code=e.response.status_code, detail=f"Ошибка от сервиса: {e.response.text}")