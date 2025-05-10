
# myFiubaGymbro 🏋️‍♂️

This is the monorepo for **myFiubaGymbro**, an application to help FIUBA students stay fit and track healthy habits. It includes a **FastAPI backend**, a **React + TypeScript frontend**, and a shared **PostgreSQL database**, all running in a unified development container.

---

## 📁 Project Structure

```
.
├── backend/       # FastAPI backend
├── frontend/      # React + Vite frontend
├── .devcontainer/ # DevContainer configuration
├── docker-compose.yml
└── README.md
```

---

## 🚀 Features

- FastAPI backend with SQLAlchemy and Alembic
- React + TypeScript frontend using Vite
- Shared PostgreSQL database
- DevContainer for a consistent dev environment
- Docker Compose orchestration

---

## 🧱 Prerequisites

- [Docker](https://www.docker.com/)
- [Visual Studio Code](https://code.visualstudio.com/) with the **Dev Containers** extension (optional, recommended)

---

## ⚙️ Setup with DevContainer (Recommended)

1. Open the project in VS Code.
2. When prompted, **"Reopen in Container"**.
3. The services will spin up with:
   - Backend accessible at `http://localhost:8000` (only when running)
   - Frontend accessible at `http://localhost:8080` (only when running)
   - PostgreSQL running internally

> If not prompted, use `Ctrl+Shift+P → Dev Containers: Reopen in Container`.

---

## 🐘 Database

A PostgreSQL 14 container is included via Docker Compose.

### Connection details

```env
Host: db
Port: 5432
User: postgres
Password: secret
Database: myfiubagymbro
```

Use this in your `.env` file in the `backend/` folder:

```env
DATABASE_URL=postgresql://postgres:secret@db:5432/myfiubagymbro
```

You can connect with any SQL client using `localhost:5432` if ports are exposed.

---

## 📦 Backend Setup (FastAPI)

### Local setup inside DevContainer

```bash
cd backend
pip install -r requirements.txt
```

### API Docs

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### Run migrations:

```bash
alembic upgrade head
```

### Start the server:

```bash
fastapi run src/main.py --port 8000
```

### Tests

```bash
pytest
```

---

## 💻 Frontend Setup (React + Vite)

### Local setup inside DevContainer

```bash
cd frontend
npm install
```

### Run in Developer Mode

```bash
npm install
npm run dev
```

The app will be live at: `http://localhost:8080`

### Run Production Build

1. Build the app:

    ```bash
    npm run build
    ```

2. Preview the production build:

    ```bash
    npm run preview
    ```

### Access from Outside

If running inside a devcontainer or Docker, ensure the port 8080 is forwarded or exposed. You can then access the app from your host machine at:

```
http://localhost:8080
```

---

## 🐳 Docker Compose Setup (without DevContainer)

If not using DevContainers, you can run the full stack with:

```bash
docker-compose up --build
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a new feature branch
3. Commit and push your changes
4. Open a pull request

---

## 📄 License

MIT License

---

## 🏠 Local Development with Docker Compose

In addition to the DevContainer setup, there's a **local-running** folder that provides a full-stack development environment using `docker-compose`. This setup includes:

### ▶️ Running the Project

You can manage the entire stack using the provided scripts inside the `local-running` directory:

- To start all services:
  ```bash
  ./start.sh
  ```

- To stop all services:
  ```bash
  ./stop.sh
  ```

Access the app locally:
- Frontend: [http://localhost:8080](http://localhost:8080)
- Backend API docs: [http://localhost:8000/docs](http://localhost:8000/docs)

