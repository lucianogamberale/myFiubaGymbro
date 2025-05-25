from typing import List

from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_exercise_dtos import UserExerciseCreationDTO, UserExerciseResponseDTO
from src.services.user_exercises import UserExercisesService

router = APIRouter(prefix="/user-exercises", tags=["UserExercises"])

# ====================== MANAGING - USER EXERCIES ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_exercises(
    user_id: float,
    user_exercise_data: UserExerciseCreationDTO,
    db: DBSessionDependency,
) -> None:
    UserExercisesService(db).create_user_exercise(user_id, user_exercise_data)


# ====================== QUERYING - USER EXERCIES ====================== #


@router.get(
    "/{user_id}",
    response_model=List[UserExerciseResponseDTO],
    status_code=status.HTTP_200_OK,
)
def get_user_exercises(
    user_id: float, db: DBSessionDependency
) -> List[UserExerciseResponseDTO]:
    return UserExercisesService(db).get_user_exercises(user_id)
