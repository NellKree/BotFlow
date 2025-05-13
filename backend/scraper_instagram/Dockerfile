FROM python:3.11-slim

WORKDIR /app

# Устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходники и сессию
COPY . .
COPY session-nikaalidozi ./

# Явно задаём команду запуска
CMD ["python", "main.py"]
