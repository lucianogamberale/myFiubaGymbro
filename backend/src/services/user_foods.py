from sqlalchemy.orm import Session
from src.dtos.user_food_dtos import UserFoodCreationDTO, UserFoodReponseDTO
from src.repositories.user_foods import UserFoodsRepository


class UserFoodsService:

    def __init__(self, db_session: Session):
        self.users_repo = UserFoodsRepository(db_session)

    def create_user_food(self, user_id: float, user_food_data: UserFoodCreationDTO) -> None:
        self.users_repo.save_new_user_food(user_id, user_food_data)

    def get_user_foods(self, user_id: float) -> list[UserFoodReponseDTO]:
        user_foods = self.users_repo.get_all_user_foods(user_id)
        return [
            UserFoodReponseDTO(
                id=user_food.id,
                food_name=user_food.food_name,
                food_category=user_food.food_category,
                calories=user_food.calories,
                date_eaten=user_food.date_eaten,
            )
            for user_food in user_foods
        ]
