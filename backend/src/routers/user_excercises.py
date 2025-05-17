from typing import List

from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_excercise_dtos import (
    UserExcerciseCreationDTO,
    UserExcerciseResponseDTO,
)
from src.services.user_excercises import UserExcercisesService

router = APIRouter(prefix="/user-exercises", tags=["UserExercises"])

# ====================== MANAGING - USER FOODS ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_excercises(
    user_id: float,
    user_excercise_data: UserExcerciseCreationDTO,
    db: DBSessionDependency,
):
    UserExcercisesService(db).create_user_excercise(user_id, user_excercise_data)


# ====================== QUERYING - USER FOODS ====================== #


@router.get(
    "/{user_id}",
    response_model=List[UserExcerciseResponseDTO],
    status_code=status.HTTP_200_OK,
)
def get_user_excercises(user_id: float, db: DBSessionDependency):
    return UserExcercisesService(db).get_user_excercises(user_id)
