from typing import List

from sqlalchemy.orm import Session
from src.dtos.user_food_dtos import UserFoodCreationDTO, UserFoodReponseDTO
from src.repositories.foods import FoodsRepository
from src.repositories.user_foods import UserFoodsRepository


class UserFoodsService:

    def __init__(self, db_session: Session):
        self.foods_repo = FoodsRepository(db_session)
        self.user_foods_repo = UserFoodsRepository(db_session)

    def create_user_food(
        self, user_id: float, user_food_data: UserFoodCreationDTO
    ) -> None:
        # this will help us to have recommended foods
        # do not create food if already exist to avoid duplicate entries
        food = self.foods_repo.get_food_named(
            user_food_data.food_name, user_food_data.food_category
        )
        if food is None:
            food = self.foods_repo.save_new_food(
                food_name=user_food_data.food_name,
                food_category=user_food_data.food_category,
            )

        self.user_foods_repo.save_new_user_food(user_id, food, user_food_data)

    def get_user_foods(self, user_id: float) -> List[UserFoodReponseDTO]:
        user_foods = self.user_foods_repo.get_all_user_foods(user_id)
        return [
            UserFoodReponseDTO(
                id=user_food.id,
                food_name=user_food.food.name,
                food_category=user_food.food.category,
                calories=user_food.calories,
                date_eaten=user_food.date_eaten,
            )
            for user_food in user_foods
        ]
