FROM python:3.13-slim

WORKDIR /app

COPY ./backend/requirements.txt /requirements.txt

RUN pip3 install --no-cache-dir --upgrade -r /requirements.txt

COPY ./backend/src /src

EXPOSE 8080

CMD ["fastapi", "run", "/src/main.py", "--port", "8000"]

RUN apt-get update && apt-get install -y curl && apt-get clean

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=1 \
    CMD curl -s --fail http://localhost:8000/api/health-check | grep '"healthy":true' > /dev/null || exit 1