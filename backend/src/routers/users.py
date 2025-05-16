from fastapi import APIRouter, status
from src.dtos.user_dtos import UserCreationDTO
from src.services.users import UsersService
from src.deps.database import DBSessionDependency

router = APIRouter(prefix="/api", tags=["Users"])

# ==============================================================================


@router.get("/users", status_code=status.HTTP_200_OK)
def get_users():
    return [{"id": 123, "name": "nombreDeUsuario"}]


@router.post("/register", status_code=status.HTTP_201_CREATED)
def create_user(user_data: UserCreationDTO, db: DBSessionDependency):
    UsersService(db).create_user(user_data)
