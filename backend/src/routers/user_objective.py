from fastapi import APIRouter, status
from typing import List
from src.deps.database import DBSessionDependency
from src.dtos.user_objective_dtos import UserObjectiveDataDTO
from src.services.user_objective import UserObjectiveService

router = APIRouter(prefix="/user-objectives", tags=["UserObjectives"])

# ====================== MANAGING - USER OBJECTIVES ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_objective(
    user_id: float,
    user_objective_data: UserObjectiveDataDTO,
    db: DBSessionDependency,
) -> None:
    UserObjectiveService(db).create_user_objective(user_id, user_objective_data)


@router.get(
    "/{user_id}",
    response_model=List[UserObjectiveDataDTO],
    status_code=status.HTTP_200_OK,
)
def get_all_user_objectives(user_id: float, db: DBSessionDependency) -> List[UserObjectiveDataDTO]:
    return UserObjectiveService(db).get_all_user_objective_data(user_id)
