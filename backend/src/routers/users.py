from fastapi import APIRouter, status

from backend.src.deps.database import DBSessionDependency

router = APIRouter(prefix="/api", tags=["Users"])

# ==============================================================================


@router.get("/test", status_code=status.HTTP_200_OK)
def test(
    db: DBSessionDependency,
):
    yield
