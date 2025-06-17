from typing import List

from fastapi import APIRouter, status
from src.deps.database import DBSessionDependency
from src.dtos.user_food_dtos import UserFoodReponseDTO, UserFoodRequestDataDTO
from src.services.user_foods import UserFoodsService

router = APIRouter(prefix="/user-foods", tags=["UserFoods"])

# ====================== MANAGING - USER FOODS ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_food(
    user_id: float, user_food_data: UserFoodRequestDataDTO, db: DBSessionDependency
) -> None:
    UserFoodsService(db).create_user_food(user_id, user_food_data)


@router.put("/{user_id}/foods/{user_food_id}", status_code=status.HTTP_204_NO_CONTENT)
def update_user_food(
    user_id: float,
    user_food_id: float,
    user_food_data: UserFoodRequestDataDTO,
    db: DBSessionDependency,
) -> None:
    UserFoodsService(db).update_user_food(user_id, user_food_id, user_food_data)


@router.delete(
    "/{user_id}/foods/{user_food_id}", status_code=status.HTTP_204_NO_CONTENT
)
def delete_user_food(
    user_id: float, user_food_id: float, db: DBSessionDependency
) -> None:
    UserFoodsService(db).delete_user_food(user_id, user_food_id)


# ====================== QUERYING - USER FOODS ====================== #


@router.get(
    "/{user_id}",
    response_model=List[UserFoodReponseDTO],
    status_code=status.HTTP_200_OK,
)
def get_user_foods(user_id: float, db: DBSessionDependency) -> List[UserFoodReponseDTO]:
    return UserFoodsService(db).get_user_foods(user_id)

@router.get(
    "/{user_id}/foods/{user_food_id}",
    response_model=UserFoodReponseDTO,
    status_code=status.HTTP_200_OK,
)
def get_user_food(
    user_id: float, user_food_id: float, db: DBSessionDependency
) -> UserFoodReponseDTO:
    return UserFoodsService(db).get_user_food(user_id, user_food_id)