from typing import Dict

from fastapi import FastAPI
from fastapi.concurrency import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy import create_engine

from .config.api_metadata import FASTAPI_METADATA
from .config.env import DB_URL
from .repositories.models.base_model import Base
from .routers.diets import router as diets_router
from .routers.routines import router as routines_router
from .routers.user_auth import router as user_auth_router
from .routers.user_exercises import router as user_exercises_router
from .routers.user_foods import router as user_foods_router
from .routers.user_health_data import router as users_router
from .routers.user_objective import router as user_objective
from .routers.user_daily_calories_goal import router as user_daily_calories_goal
from .routers.user_sincronization import router as user_app_sync

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
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_auth_router)
app.include_router(users_router)
app.include_router(user_objective)
app.include_router(user_daily_calories_goal)
app.include_router(user_foods_router)
app.include_router(user_exercises_router)
app.include_router(diets_router)
app.include_router(routines_router)
app.include_router(user_app_sync)

# ==============================================================================


@app.get("/", include_in_schema=False)
def root_docs_redirect() -> RedirectResponse:
    return RedirectResponse(url="/docs")


@app.get("/health-check", include_in_schema=False)
def health_check() -> Dict[str, bool]:
    return {"healthy": True}
