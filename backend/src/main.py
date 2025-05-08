from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from .config.api_metadata import FASTAPI_METADATA

from .routers.users import router as users_router


app = FastAPI(**FASTAPI_METADATA)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users_router)

# ==============================================================================


@app.get("/api/health-check")
def health_ping():
    return {"healthy": True}
