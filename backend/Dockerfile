FROM python:3.13-slim

WORKDIR /

COPY ./backend/requirements.txt /backend/requirements.txt

RUN pip3 install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./backend/src /backend/src

EXPOSE 8080

CMD ["fastapi", "run", "backend/src/main.py", "--port", "8080"]

RUN apt-get update && apt-get install -y curl && apt-get clean

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=1 \
    CMD curl -s --fail http://localhost:8080/api/health-check | grep '"healthy":true' > /dev/null || exit 1