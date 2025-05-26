from typing import Sequence, Optional
from src.dtos.user_daily_calories_goal_dtos import UserDailyCaloriesGoalCreationDTO
from src.repositories.models.user_daily_calories_goal import UserDailyCaloriesGoal
import sqlalchemy as sa

from .base import BaseRepository


class UserDailyCaloriesGoalRepository(BaseRepository):
    def save_daily_calories_goal_data(
        self, user_id: float, user_daily_calories_goal_data: UserDailyCaloriesGoalCreationDTO
    ) -> UserDailyCaloriesGoal:
        user_daily_calories_goal = UserDailyCaloriesGoal(
            user_id=user_id,
            amount_of_calories=user_daily_calories_goal_data.amount_of_calories,
            date=user_daily_calories_goal_data.date,
        )

        self.db_session.add(user_daily_calories_goal)
        self.db_session.commit()
        self.db_session.refresh(user_daily_calories_goal)
        return user_daily_calories_goal

    def get_all_user_daily_calories_goal_data(self, user_id: float) -> Sequence[UserDailyCaloriesGoal]:
        return (
            self.db_session.execute(
                sa.select(UserDailyCaloriesGoal).where(UserDailyCaloriesGoal.user_id == user_id)
            )
            .scalars()
            .all()
        )

    def get_last_user_daily_calories_goal_data(self, user_id: float) -> Optional[UserDailyCaloriesGoal]:
        return (
            self.db_session.query(UserDailyCaloriesGoal)
            .filter(UserDailyCaloriesGoal.user_id == user_id)
            .order_by(sa.desc(UserDailyCaloriesGoal.date))
            .first()
        )