from typing import Sequence

import sqlalchemy as sa
from fastapi import HTTPException, status
from src.dtos.user_food_dtos import UserFoodRequestDataDTO
from src.repositories.models.food import Food
from src.repositories.models.user_food import UserFood

from .base import BaseRepository


class UserFoodsRepository(BaseRepository):

    # ====================== MANAGING ====================== #

    def save_new_user_food(
        self, user_id: float, food: Food, user_food_data: UserFoodRequestDataDTO
    ) -> UserFood:
        user_food = UserFood(
            user_id=user_id,
            food_id=food.id,
            calories=user_food_data.calories,
            date=user_food_data.date,
        )

        self.db_session.add(user_food)
        self.db_session.commit()
        self.db_session.refresh(user_food)
        return user_food

    def update_user_food(
        self,
        user_id: float,
        user_food_id: float,
        user_food_data: UserFoodRequestDataDTO,
    ) -> UserFood:
        user_food = self.get_user_food(user_id, user_food_id)

        user_food.calories = user_food_data.calories
        user_food.date = user_food_data.date

        self.db_session.commit()
        self.db_session.refresh(user_food)

        return user_food

    def delete_user_food(self, user_id: float, user_food_id: float) -> None:
        user_food = self.get_user_food(user_id, user_food_id)

        self.db_session.delete(user_food)
        self.db_session.commit()

    # ====================== QUERYING ====================== #

    def get_all_user_foods(self, user_id: float) -> Sequence[UserFood]:
        return (
            self.db_session.execute(
                sa.select(UserFood).where(UserFood.user_id == user_id)
            )
            .scalars()
            .all()
        )

    def get_user_food(self, user_id: float, user_food_id: float) -> UserFood:
        user_food = (
            self.db_session.execute(
                sa.select(UserFood).where(
                    UserFood.user_id == user_id, UserFood.id == user_food_id
                )
            )
            .scalars()
            .one_or_none()
        )
        if not user_food:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User food with id {user_food_id} not found for user {user_id}.",
            )
        return user_food
