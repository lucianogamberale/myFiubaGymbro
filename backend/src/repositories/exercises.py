import sqlalchemy as sa
from fastapi import HTTPException, status
from src.repositories.models.exercise import Exercise

from .base import BaseRepository


class ExercisesRepository(BaseRepository):

    # ====================== MANAGING ====================== #

    def save_new_exercise(self, exercise_name: str, exercise_category: str) -> Exercise:
        exercise = Exercise(
            name=exercise_name,
            category=exercise_category,
        )

        self.db_session.add(exercise)
        self.db_session.commit()
        self.db_session.refresh(exercise)
        return exercise

    def update_exercise(
        self,
        exercise_id: float,
        exercise_name: str,
        exercise_category: str,
    ) -> Exercise:
        exercise = (
            self.db_session.query(Exercise).filter(Exercise.id == exercise_id).first()
        )
        if exercise:
            exercise.name = exercise_name
            exercise.category = exercise_category
            self.db_session.commit()
            self.db_session.refresh(exercise)
            return exercise
        else:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Exercise with id {exercise_id} not found",
            )

    # ====================== QUERYING ====================== #

    def get_exercise_named(
        self, exercise_name: str, exercise_category: str
    ) -> Exercise | None:
        return (
            self.db_session.query(Exercise)
            .filter(
                sa.and_(
                    Exercise.name == exercise_name,
                    Exercise.category == exercise_category,
                )
            )
            .first()
        )
