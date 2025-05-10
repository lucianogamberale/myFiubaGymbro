# myFiubaGymbro Frontend

This is the frontend for **myFiubaGymbro**, built using React, TypeScript, and Vite.

## 📦 Features

- React + TypeScript + Vite stack
- Tailwind CSS for styling
- Hot Module Replacement (HMR) enabled
- DevContainer support for consistent development environments

## 🧪 Requirements

- Node.js (v18+)
- npm (v9+)
- VS Code with DevContainers extension (optional but recommended)

## ⚙️ Development Setup

### Open in DevContainer (Recommended)

If you have Visual Studio Code with the Dev Containers extension:

1. Open the project folder in VS Code.
2. Click on “Reopen in Container” when prompted.

### Run in Developer Mode

```bash
npm install
npm run dev
```

This will start the development server, typically on http://localhost:8080.

## 🚀 Run Production Build

1. Build the app:

```bash
npm run build
```

2. Preview the production build:

```bash
npm run preview
```

### Run via Docker (Custom)

Use the included Dockerfile to build and serve the app via `serve`:

```bash
docker build -t myfiubagymbro-frontend .
docker run -p 8080:8080 myfiubagymbro-frontend
```

## 🌐 Access from Outside

If running inside a devcontainer or Docker, ensure the port 8080 is forwarded or exposed. You can then access the app from your host machine at:

```
http://localhost:8080
```

## 📑 APIs Documentation

The frontend consumes APIs exposed by the backend (FastAPI). You can access the API documentation at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
