import sqlalchemy as sa
from src.dtos.user_food_dtos import UserFoodCreationDTO
from src.repositories.models.user_food import UserFood

from .base import BaseRepository


class UserFoodsRepository(BaseRepository):
    def save_new_user_food(self, user_id, user_food_data: UserFoodCreationDTO) -> UserFood:
        user_food = UserFood(
            user_id=user_id,
            food_name=user_food_data.food_name,
            food_category=user_food_data.food_category,
            calories=user_food_data.calories,
            date_eaten=user_food_data.date_eaten,
        )

        self.db_session.add(user_food)
        self.db_session.commit()
        self.db_session.refresh(user_food)
        return user_food

    def get_all_user_foods(self, user_id: float):
        query = sa.select(UserFood).where(UserFood.user_id == user_id)
        result = self.db_session.execute(query)
        return result.scalars().all()