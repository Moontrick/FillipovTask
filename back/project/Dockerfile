FROM python:3.8

WORKDIR /project

# Копируем все файлы из текущей директории (где находится Dockerfile) в рабочую директорию контейнера (/app)
COPY . .

COPY requirements.txt .
RUN pip install -r requirements.txt
# Запускаем команду, которая будет запущена при старте контейнера
CMD ["python", "main.py"]
