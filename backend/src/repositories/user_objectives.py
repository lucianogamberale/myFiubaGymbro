from typing import Optional, List
from src.dtos.user_objective_dtos import UserObjectiveDataDTO
from src.repositories.models.user_objective import UserObjective
import sqlalchemy as sa

from .base import BaseRepository


class UserObjectiveRepository(BaseRepository):
    def save_objective_data(
        self, user_id: float, user_objective_data: UserObjectiveDataDTO
    ) -> UserObjective:
        user_objective = UserObjective(
            user_id=user_id,
            activity=user_objective_data.activity,
            current_progress=user_objective_data.current_progress,
            objective=user_objective_data.objective,
            unit_of_measurement=user_objective_data.unit_of_measurement,
            start_date=user_objective_data.start_date,
            end_date=user_objective_data.end_date,
        )

        self.db_session.add(user_objective)
        self.db_session.commit()
        self.db_session.refresh(user_objective)
        return user_objective

    def get_all_user_objective_data(self, user_id: float) -> Optional[List[UserObjective]]:
        return self.db_session.execute(
            sa.select(UserObjective)
            .where(UserObjective.user_id == user_id)
            .order_by(sa.desc(UserObjective.id))
        ).scalars().all()
