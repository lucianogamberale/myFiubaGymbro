from typing import Dict

from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine

from .config.api_metadata import FASTAPI_METADATA
from .config.env import DB_URL
from .repositories.models.base_model import Base
from .routers.user_exercises import router as user_exercises_router
from .routers.user_foods import router as user_foods_router
from .routers.users import router as users_router

engine = create_engine(DB_URL, echo=True)


@asynccontextmanager
async def lifespan(app: FastAPI):  # type: ignore
    # Create tables on startup
    Base.metadata.create_all(bind=engine)

    yield  # Startup completed

    # remove tables on shutdown
    Base.metadata.drop_all(bind=engine)


app = FastAPI(**FASTAPI_METADATA, lifespan=lifespan)  # type: ignore

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(user_foods_router)
app.include_router(user_exercises_router)

# ==============================================================================


@app.get("/health-check")
def health_check() -> Dict[str, bool]:
    return {"healthy": True}
