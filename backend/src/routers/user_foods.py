from typing import List

from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_food_dtos import UserFoodCreationDTO, UserFoodReponseDTO
from src.services.user_foods import UserFoodsService

router = APIRouter(prefix="/user-foods", tags=["UserFoods"])

# ====================== MANAGING - USER FOODS ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_food(
    user_id: float, user_food_data: UserFoodCreationDTO, db: DBSessionDependency
) -> None:
    UserFoodsService(db).create_user_food(user_id, user_food_data)


# ====================== QUERYING - USER FOODS ====================== #


@router.get(
    "/{user_id}",
    response_model=List[UserFoodReponseDTO],
    status_code=status.HTTP_200_OK,
)
def get_user_foods(user_id: float, db: DBSessionDependency) -> List[UserFoodReponseDTO]:
    return UserFoodsService(db).get_user_foods(user_id)
