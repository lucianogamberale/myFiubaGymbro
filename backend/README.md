# myFiubaGymbro Backend

This is the backend service for the **myFiubaGymbro** application, responsible for handling API requests, managing business logic, and interfacing with the database.

## 🚀 Features

- RESTful API built with FastAPI
- Authentication and user management
- Database integration via SQLAlchemy
- Containerized with Docker
- Automatic interactive API documentation

## 🛠 Tech Stack

- Python 3.10+
- FastAPI
- SQLAlchemy
- PostgreSQL
- Docker
- Uvicorn

## 📦 Installation

### Prerequisites

- Python 3.10+
- PostgreSQL
- Docker (optional)

### Local Setup

Create a `.env` file in `backend/` with:

```env
DATABASE_URL=postgresql://postgres:secret@db:5432/myfiubagymbro
```

Run migrations:

```bash
alembic upgrade head
```

Start the server:

```bash
fastapi run src/main.py --port 8000
```

### Docker Setup

```bash
docker-compose up --build
```

## 📚 API Documentation

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## 🧪 Running Tests

```bash
pytest
```

Ensure test database is configured in `.env`.

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Make changes and push
4. Open a PR

## 📄 License

MIT License