from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency

router = APIRouter(prefix="/api", tags=["Users"])

# ==============================================================================


@router.get("/users", status_code=status.HTTP_200_OK)
def get_users():
    return [{"id": 123, "name": "nombreDeUsuario"}]
