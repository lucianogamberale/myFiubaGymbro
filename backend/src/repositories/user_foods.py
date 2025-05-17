from typing import List, Sequence

import sqlalchemy as sa
from src.dtos.user_food_dtos import UserFoodCreationDTO
from src.repositories.models.food import Food
from src.repositories.models.user_food import UserFood

from .base import BaseRepository


class UserFoodsRepository(BaseRepository):
    def save_new_user_food(
        self, user_id: float, food: Food, user_food_data: UserFoodCreationDTO
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

    def get_all_user_foods(self, user_id: float) -> Sequence[UserFood]:
        return (
            self.db_session.execute(
                sa.select(UserFood).where(UserFood.user_id == user_id)
            )
            .scalars()
            .all()
        )
