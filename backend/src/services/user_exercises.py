from datetime import datetime
from typing import List

import sqlalchemy as sa
from sqlalchemy.orm import Session
from src.dtos.user_exercise_dtos import (
    UserExerciseRequestDataDTO,
    UserExerciseResponseDTO,
)
from src.dtos.user_objective_dtos import UserObjectiveUpdateDTO
from src.repositories.exercises import ExercisesRepository
from src.repositories.models.exercise import ExerciseCategory
from src.repositories.models.user_objective import UserObjective
from src.repositories.user_exercises import UserExercisesRepository
from src.repositories.user_objectives import UserObjectiveRepository


class UserExercisesService:

    def __init__(self, db_session: Session):
        self.exercise_repo = ExercisesRepository(db_session)
        self.user_exercises_repo = UserExercisesRepository(db_session)
        self.user_objectives_repo = UserObjectiveRepository(db_session)

    # ====================== MANAGING ====================== #

    def create_user_exercise(
        self, user_id: float, user_exercise_data: UserExerciseRequestDataDTO
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

        # Update weight loss objective if exists
        self._update_weight_loss_objective(user_id, user_exercise_data)

    def _update_weight_loss_objective(
        self, user_id: float, user_exercise_data: UserExerciseRequestDataDTO
    ) -> None:
        # Get active weight loss objective
        weight_loss_objective = self.user_objectives_repo.get_all_user_objective_data(
            user_id
        )
        if not weight_loss_objective:
            return

        # Find the active weight loss objective
        active_objective = None
        today = datetime.now()
        for objective in weight_loss_objective:
            if (
                objective.activity == "Perder peso"
                and objective.start_date <= today <= objective.end_date
            ):
                active_objective = objective
                break

        if not active_objective:
            return

        # Update objective progress (now working directly with calories)
        progress_increment = user_exercise_data.calories
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

    def update_user_exercise(
        self,
        user_id: float,
        user_exercise_id: float,
        user_exercise_data: UserExerciseRequestDataDTO,
    ) -> None:
        user_exercise = self.user_exercises_repo.update_user_exercise(
            user_id, user_exercise_id, user_exercise_data
        )

        # create exercise if it does not exist
        exercise = self.exercise_repo.get_exercise_named(
            user_exercise_data.exercise_name, user_exercise_data.exercise_category
        )
        if exercise is None:
            exercise = self.exercise_repo.save_new_exercise(
                exercise_name=user_exercise_data.exercise_name,
                exercise_category=user_exercise_data.exercise_category,
            )

        user_exercise.exercise_id = exercise.id
        self.user_exercises_repo.db_session.commit()

    def delete_user_exercise(self, user_id: float, user_exercise_id: float) -> None:
        self.user_exercises_repo.delete_user_exercise(user_id, user_exercise_id)

    # ====================== QUERYING ====================== #

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

    def get_user_exercise(
        self, user_id: float, user_exercise_id: float
    ) -> UserExerciseResponseDTO:
        user_exercise = self.user_exercises_repo.get_user_exercise(
            user_id, user_exercise_id
        )

        return UserExerciseResponseDTO(
            id=user_exercise.id,
            exercise_name=user_exercise.exercise.name,
            exercise_category=ExerciseCategory(user_exercise.exercise.category),
            duration=user_exercise.duration,
            calories=user_exercise.calories,
            date=user_exercise.date,
        )
