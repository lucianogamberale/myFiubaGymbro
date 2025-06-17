from datetime import datetime
from typing import List

from sqlalchemy.orm import Session
from src.dtos.user_food_dtos import UserFoodReponseDTO, UserFoodRequestDataDTO
from src.dtos.user_objective_dtos import UserObjectiveUpdateDTO
from src.repositories.foods import FoodsRepository
from src.repositories.models.food import FoodCategory
from src.repositories.user_foods import UserFoodsRepository
from src.repositories.user_objectives import UserObjectiveRepository


class UserFoodsService:

    def __init__(self, db_session: Session):
        self.foods_repo = FoodsRepository(db_session)
        self.user_foods_repo = UserFoodsRepository(db_session)
        self.user_objectives_repo = UserObjectiveRepository(db_session)

    # ====================== MANAGING - PRIVATE ====================== #

    def _update_weight_gain_objective(
        self, user_id: float, user_food_data: UserFoodRequestDataDTO
    ) -> None:
        # Get active weight gain objective
        weight_gain_objective = self.user_objectives_repo.get_all_user_objective_data(
            user_id
        )
        if not weight_gain_objective:
            return

        # Find the active weight gain objective
        active_objective = None
        today = datetime.now()
        for objective in weight_gain_objective:
            if (
                objective.activity == "Ganar peso"
                and objective.start_date <= today <= objective.end_date
            ):
                active_objective = objective
                break

        if not active_objective:
            return

        # Update objective progress (now working directly with calories)
        progress_increment = user_food_data.calories
        active_objective.current_progress = min(
            active_objective.current_progress + progress_increment,
            active_objective.objective,
        )

        # Update the objective in the database
        update_dto = UserObjectiveUpdateDTO(
            activity=active_objective.activity,
            current_progress=active_objective.current_progress,
            objective=active_objective.objective,
            unit_of_measurement=active_objective.unit_of_measurement,
            start_date=active_objective.start_date,
            end_date=active_objective.end_date,
        )

        self.user_objectives_repo.update_objective_data(
            user_id, active_objective.id, update_dto
        )

    def delete_user_food(self, user_id: float, user_food_id: float) -> None:
        self.user_foods_repo.delete_user_food(user_id, user_food_id)

    # ====================== MANAGING ====================== #

    def create_user_food(
        self, user_id: float, user_food_data: UserFoodRequestDataDTO
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

        # Update weight gain objective if exists
        self._update_weight_gain_objective(user_id, user_food_data)

    def update_user_food(
        self,
        user_id: float,
        user_food_id: float,
        user_food_data: UserFoodRequestDataDTO,
    ) -> None:
        user_food = self.user_foods_repo.update_user_food(
            user_id, user_food_id, user_food_data
        )

        # create food if it does not exist
        food = self.foods_repo.get_food_named(
            user_food_data.food_name, user_food_data.food_category
        )
        if food is None:
            food = self.foods_repo.save_new_food(
                food_name=user_food_data.food_name,
                food_category=user_food_data.food_category,
            )

        user_food.food_id = food.id
        self.user_foods_repo.db_session.commit()

        self._update_weight_gain_objective(user_id, user_food_data)

    # ====================== QUERYING ====================== #

    def get_user_foods(self, user_id: float) -> List[UserFoodReponseDTO]:
        user_foods = self.user_foods_repo.get_all_user_foods(user_id)
        return [
            UserFoodReponseDTO(
                id=user_food.id,
                food_name=user_food.food.name,
                food_category=FoodCategory(user_food.food.category),
                calories=user_food.calories,
                date=user_food.date,
            )
            for user_food in user_foods
        ]
