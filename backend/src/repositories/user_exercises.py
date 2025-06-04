from typing import Sequence

import sqlalchemy as sa
from fastapi import HTTPException, status
from src.dtos.user_exercise_dtos import UserExerciseRequestDataDTO
from src.repositories.models.exercise import Exercise
from src.repositories.models.user_exercise import UserExercise

from .base import BaseRepository


class UserExercisesRepository(BaseRepository):

    # ====================== MANAGING ====================== #

    def save_new_user_exercise(
        self,
        user_id: float,
        exercise: Exercise,
        user_exercise_data: UserExerciseRequestDataDTO,
    ) -> UserExercise:
        user_exercise = UserExercise(
            user_id=user_id,
            exercise_id=exercise.id,
            duration=user_exercise_data.duration,
            calories=user_exercise_data.calories,
            date=user_exercise_data.date,
        )

        self.db_session.add(user_exercise)
        self.db_session.commit()
        self.db_session.refresh(user_exercise)
        return user_exercise

    def update_user_exercise(
        self,
        user_id: float,
        user_exercise_id: float,
        user_exercise_data: UserExerciseRequestDataDTO,
    ) -> UserExercise:
        user_exercise = self.get_user_exercise(user_id, user_exercise_id)

        user_exercise.duration = user_exercise_data.duration
        user_exercise.calories = user_exercise_data.calories
        user_exercise.date = user_exercise_data.date

        self.db_session.commit()
        self.db_session.refresh(user_exercise)

        return user_exercise

    def delete_user_exercise(self, user_id: float, user_exercise_id: float) -> None:
        user_exercise = self.get_user_exercise(user_id, user_exercise_id)

        self.db_session.delete(user_exercise)
        self.db_session.commit()

    # ====================== QUERYING ====================== #

    def get_all_user_exercises(self, user_id: float) -> Sequence[UserExercise]:
        return (
            self.db_session.execute(
                sa.select(UserExercise).where(UserExercise.user_id == user_id)
            )
            .scalars()
            .all()
        )

    def get_user_exercise(
        self, user_id: float, user_exercise_id: float
    ) -> UserExercise:
        user_exercise = (
            self.db_session.query(UserExercise)
            .filter(
                UserExercise.user_id == user_id,
                UserExercise.id == user_exercise_id,
            )
            .first()
        )
        if not user_exercise:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User exercise with id {user_exercise_id} not found for user {user_id}",
            )
        return user_exercise
