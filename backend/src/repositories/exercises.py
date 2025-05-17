import sqlalchemy as sa
from src.repositories.models.exercise import Exercise

from .base import BaseRepository


class ExercisesRepository(BaseRepository):
    def save_new_exercise(self, exercise_name: str, exercise_category: str) -> Exercise:
        exercise = Exercise(
            name=exercise_name,
            category=exercise_category,
        )

        self.db_session.add(exercise)
        self.db_session.commit()
        self.db_session.refresh(exercise)
        return exercise

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
