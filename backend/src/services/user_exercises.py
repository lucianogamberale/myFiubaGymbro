from typing import List

from sqlalchemy.orm import Session
from src.dtos.user_exercise_dtos import UserExerciseCreationDTO, UserExerciseResponseDTO
from src.repositories.exercises import ExercisesRepository
from src.repositories.models.exercise import ExerciseCategory
from src.repositories.user_exercises import UserExercisesRepository


class UserExercisesService:

    def __init__(self, db_session: Session):
        self.exercise_repo = ExercisesRepository(db_session)
        self.user_exercises_repo = UserExercisesRepository(db_session)

    def create_user_exercise(
        self, user_id: float, user_exercise_data: UserExerciseCreationDTO
    ) -> None:
        # this will help us to have recommended exercises
        # do not create exercise if already exist to avoid duplicate entries
        exercise = self.exercise_repo.get_exercise_named(
            user_exercise_data.exercise_name, user_exercise_data.exercise_category
        )
        if exercise is None:
            exercise = self.exercise_repo.save_new_exercise(
                exercise_name=user_exercise_data.exercise_name,
                exercise_category=user_exercise_data.exercise_category,
            )

        self.user_exercises_repo.save_new_user_exercise(
            user_id, exercise, user_exercise_data
        )

    def get_user_exercises(self, user_id: float) -> List[UserExerciseResponseDTO]:
        user_exercises = self.user_exercises_repo.get_all_user_exercises(user_id)
        return [
            UserExerciseResponseDTO(
                id=user_exercise.id,
                exercise_name=user_exercise.exercise.name,
                exercise_category=ExerciseCategory(user_exercise.exercise.category),
                duration=user_exercise.duration,
                calories=user_exercise.calories,
                date=user_exercise.date,
            )
            for user_exercise in user_exercises
        ]
