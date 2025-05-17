from typing import Sequence

import sqlalchemy as sa
from src.dtos.user_exercise_dtos import UserExerciseCreationDTO
from src.repositories.models.user_exercise import UserExercise

from .base import BaseRepository


class UserExercisesRepository(BaseRepository):
    def save_new_user_exercise(
        self, user_id: float, user_exercise_data: UserExerciseCreationDTO
    ) -> UserExercise:
        user_exercise = UserExercise(
            user_id=user_id,
            exercise_name=user_exercise_data.exercise_name,
            duration=user_exercise_data.duration,
            calories=user_exercise_data.calories,
            date_done=user_exercise_data.date,
        )

        self.db_session.add(user_exercise)
        self.db_session.commit()
        self.db_session.refresh(user_exercise)
        return user_exercise

    def get_all_user_exercises(self, user_id: float) -> Sequence[UserExercise]:
        return (
            self.db_session.execute(
                sa.select(UserExercise).where(UserExercise.user_id == user_id)
            )
            .scalars()
            .all()
        )
