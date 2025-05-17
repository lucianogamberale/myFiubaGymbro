from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_dtos import UserCreationDTO, UserHealthDataCreationDTO
from src.services.users import UsersService

router = APIRouter(prefix="/users", tags=["Users"])

# ==============================================================================


# @router.get("/users", status_code=status.HTTP_200_OK)
# def get_users():
#     return [{"id": 123, "name": "nombreDeUsuario"}]


@router.post("", status_code=status.HTTP_201_CREATED)
def create_user(user_data: UserCreationDTO, db: DBSessionDependency):
    UsersService(db).create_user(user_data)


@router.post("/user-health-data/{user_id}", status_code=status.HTTP_201_CREATED)
def post_user_health_data(
    user_id: float, health_data: UserHealthDataCreationDTO, db: DBSessionDependency
):
    UsersService(db).create_user_health_data(user_id, health_data)
