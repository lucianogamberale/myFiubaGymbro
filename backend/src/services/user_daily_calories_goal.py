from fastapi import HTTPException
from typing import List, Optional
from sqlalchemy.orm import Session
from src.dtos.user_daily_calories_goal_dtos import UserDailyCaloriesGoalCreationDTO, UserDailyCaloriesGoalReponseDTO
from src.repositories.user_daily_calories_goal import UserDailyCaloriesGoalRepository


class UserDailyCaloriesGoalService:

    def __init__(self, db_session: Session):
        self.daily_calories_goals_repo = UserDailyCaloriesGoalRepository(db_session)

    def create_user_daily_calories_goal(
        self, user_id: float, user_daily_calories_goal_data: UserDailyCaloriesGoalCreationDTO
    ) -> None:

        self.daily_calories_goals_repo.save_daily_calories_goal_data(user_id, user_daily_calories_goal_data)

    def get_all_user_daily_calories_goal(self, user_id: float) -> List[UserDailyCaloriesGoalReponseDTO]:
        user_daily_calories_goal_data = self.daily_calories_goals_repo.get_all_user_daily_calories_goal_data(user_id)

        if not user_daily_calories_goal_data:
            raise HTTPException(
                status_code=404, detail="No se encontró el objetivo diario de calorías del usuario"
            )

        return [
            UserDailyCaloriesGoalReponseDTO(
                id=user_daily_calories_goal_data.id,
                amount_of_calories=user_daily_calories_goal_data.amount_of_calories,
                date=user_daily_calories_goal_data.date,
            )   
            for user_daily_calories_goal_data in user_daily_calories_goal_data
        ]

    def get_last_user_daily_calories_goal(self, user_id: float) -> Optional[UserDailyCaloriesGoalReponseDTO]:
        user_daily_calories_goal_data = self.daily_calories_goals_repo.get_all_user_daily_calories_goal_data(user_id)
        if not user_daily_calories_goal_data:
            return None
        else:
            return user_daily_calories_goal_data[-1]