FROM python:3.13-slim

WORKDIR /

COPY ./backend/requirements.txt /backend/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./backend/src /backend/src

ENV PYTHONPATH=/backend

CMD ["fastapi", "run", "backend/src/main.py", "--port", "8080"]

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=1 \
    CMD curl -s --fail http://localhost:8080/health-check | grep '"healthy":true' > /dev/null || exit 1