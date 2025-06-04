from typing import List

from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_exercise_dtos import (
    UserExerciseRequestDataDTO,
    UserExerciseResponseDTO,
)
from src.services.user_exercises import UserExercisesService

router = APIRouter(prefix="/user-exercises", tags=["UserExercises"])

# ====================== MANAGING - USER EXERCIES ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_exercises(
    user_id: float,
    user_exercise_data: UserExerciseRequestDataDTO,
    db: DBSessionDependency,
) -> None:
    UserExercisesService(db).create_user_exercise(user_id, user_exercise_data)


@router.put(
    "/{user_id}/exercises/{user_exercise_id}", status_code=status.HTTP_204_NO_CONTENT
)
def update_user_exercise(
    user_id: float,
    user_exercise_id: float,
    user_exercise_data: UserExerciseRequestDataDTO,
    db: DBSessionDependency,
) -> None:
    UserExercisesService(db).update_user_exercise(
        user_id, user_exercise_id, user_exercise_data
    )


@router.delete(
    "/{user_id}/exercises/{user_exercise_id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete_user_exercise(
    user_id: float,
    user_exercise_id: float,
    db: DBSessionDependency,
) -> None:
    UserExercisesService(db).delete_user_exercise(user_id, user_exercise_id)


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


@router.get(
    "/{user_id}/exercises/{user_exercise_id}",
    response_model=UserExerciseResponseDTO,
    status_code=status.HTTP_200_OK,
)
def get_user_exercise(
    user_id: float,
    user_exercise_id: float,
    db: DBSessionDependency,
) -> UserExerciseResponseDTO:
    return UserExercisesService(db).get_user_exercise(user_id, user_exercise_id)
