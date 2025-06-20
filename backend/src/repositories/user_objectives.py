from typing import Optional, List
from src.dtos.user_objective_dtos import UserObjectiveCreationDTO, UserObjectiveUpdateDTO, UserObjectiveResponseDTO
from src.repositories.models.user_objective import UserObjective, UserObjectiveHistory
import sqlalchemy as sa
from fastapi import HTTPException
from .base import BaseRepository
from sqlalchemy.orm import Session
from datetime import datetime


class UserObjectiveRepository(BaseRepository):
    def __init__(self, db_session: Session):
        super().__init__(db_session)

    def save_objective_data(
        self, user_id: float, user_objective_data: UserObjectiveCreationDTO
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

    def get_last_user_objective(self, user_id: float) -> Optional[UserObjective]:
        return self.db_session.execute(
            sa.select(UserObjective)
            .where(UserObjective.user_id == user_id)
            .order_by(sa.desc(UserObjective.id))
        ).scalar_one_or_none()

    def update_objective_data(
        self, user_id: float, user_objective_id: float, user_objective_data: UserObjectiveUpdateDTO
    ) -> None:
        user_objective = self.db_session.query(UserObjective).filter(sa.and_(UserObjective.user_id == user_id, UserObjective.id == user_objective_id)).first()
        if not user_objective:
            raise HTTPException(status_code=404, detail="User objective not found")
        user_objective.activity = user_objective_data.activity
        user_objective.current_progress = user_objective_data.current_progress
        user_objective.objective = user_objective_data.objective
        user_objective.unit_of_measurement = user_objective_data.unit_of_measurement
        user_objective.start_date = user_objective_data.start_date
        user_objective.end_date = user_objective_data.end_date

        # Check if objective should be moved to history
        self._check_and_move_to_history(user_objective)

        self.db_session.commit()

    def delete_objective_data(self, user_id: float, user_objective_id: float) -> None:
        user_objective = self.db_session.query(UserObjective).filter(sa.and_(UserObjective.user_id == user_id, UserObjective.id == user_objective_id)).first()
        if not user_objective:
            raise HTTPException(status_code=404, detail="User objective not found")
        self.db_session.delete(user_objective)
        self.db_session.commit()

    def get_all_user_objective_history(self, user_id: float) -> list[UserObjectiveHistory]:
        return self.db_session.query(UserObjectiveHistory).filter(
            UserObjectiveHistory.user_id == user_id
        ).order_by(UserObjectiveHistory.created_at.desc()).all()

    def _check_and_move_to_history(self, user_objective: UserObjective) -> None:
        completion_percentage = (user_objective.current_progress / user_objective.objective) * 100
        current_date = datetime.utcnow()

        # Check if objective is completed (100%) or failed (past end date)
        if completion_percentage >= 100:
            self._add_to_history(user_objective, "completed")
            self.db_session.delete(user_objective)
        elif current_date > user_objective.end_date:
            self._add_to_history(user_objective, "failed")
            self.db_session.delete(user_objective)

    def _add_to_history(self, user_objective: UserObjective, status: str) -> None:
        completion_percentage = (user_objective.current_progress / user_objective.objective) * 100
        
        history_entry = UserObjectiveHistory(
            user_id=user_objective.user_id,
            activity=user_objective.activity,
            final_progress=user_objective.current_progress,
            objective=user_objective.objective,
            unit_of_measurement=user_objective.unit_of_measurement,
            start_date=user_objective.start_date,
            end_date=user_objective.end_date,
            completion_percentage=completion_percentage,
            status=status,
            created_at=datetime.utcnow()
        )
        self.db_session.add(history_entry)