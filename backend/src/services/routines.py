from typing import List, Optional

from sqlalchemy.orm import Session
from src.dtos.routine_dtos import (
    DayOfWeekDTO,
    RoutineCreationDTO,
    RoutineExerciseEntryResponseDTO,
    RoutineResponseDTO,
    RoutineUpdateDTO,
)
from src.repositories.routines import RoutinesRepository
from src.repositories.models.routine import Routine


class RoutinesService:

    def __init__(self, db_session: Session):
        self.routines_repo = RoutinesRepository(db_session)

    def create_user_routine(
        self, user_id: float, routine_data: RoutineCreationDTO
    ) -> RoutineResponseDTO:
        new_routine = self.routines_repo.save_new_routine(user_id, routine_data)
        return RoutineResponseDTO(
            id=new_routine.id,
            name=new_routine.name,
            description=new_routine.description,
            user_id=new_routine.user_id,
            exercises=[ 
                RoutineExerciseEntryResponseDTO(
                    id=exercise.id,
                    day_of_week=DayOfWeekDTO(exercise.day_of_week.value),
                    time_of_day=exercise.time_of_day,
                    exercise_name=exercise.exercise_name,
                    exercise_category=exercise.exercise_category,
                    duration=exercise.duration,
                    calories_burned=exercise.calories_burned,
                )
                for exercise in new_routine.routine_exercises
            ],
        )

    def get_user_routines(self, user_id: float) -> list[RoutineResponseDTO]:
        user_routines = self.routines_repo.get_all_user_routines(user_id)
        return [
            RoutineResponseDTO(
                id=routine.id,
                name=routine.name,
                description=routine.description,
                user_id=routine.user_id,
                exercises=[
                    RoutineExerciseEntryResponseDTO(
                        id=exercise.id,
                        day_of_week=DayOfWeekDTO(exercise.day_of_week.value),
                        time_of_day=exercise.time_of_day,
                        exercise_name=exercise.exercise_name,
                        exercise_category=exercise.exercise_category,
                        duration=exercise.duration,
                        calories_burned=exercise.calories_burned,
                    )
                    for exercise in routine.routine_exercises
                ],
            )
            for routine in user_routines
        ]

    def get_user_routine_details(
        self, user_id: float, routine_id: float
    ) -> Optional[RoutineResponseDTO]:
        routine = self.routines_repo.get_user_routine_by_id(user_id, routine_id)
        if not routine:
            return None
        return RoutineResponseDTO(
            id=routine.id,
            name=routine.name,
            description=routine.description,
            user_id=routine.user_id,
            exercises=[
                RoutineExerciseEntryResponseDTO(
                    id=exercise.id,
                    day_of_week=DayOfWeekDTO(exercise.day_of_week.value),
                    time_of_day=exercise.time_of_day,
                    exercise_name=exercise.exercise_name,
                    exercise_category=exercise.exercise_category,
                    duration=exercise.duration,
                    calories_burned=exercise.calories_burned,
                )
                for exercise in routine.routine_exercises
            ],
        )

    def update_user_routine(
        self, user_id: float, routine_id: float, routine_data: RoutineUpdateDTO
    ) -> Optional[RoutineResponseDTO]:
        routine_to_update = self.routines_repo.get_user_routine_by_id(user_id, routine_id)
        if not routine_to_update:
            return None

        updated_routine = self.routines_repo.update_routine(routine_to_update, routine_data)

        return RoutineResponseDTO(
            id=updated_routine.id,
            name=updated_routine.name,
            description=updated_routine.description,
            user_id=updated_routine.user_id,
            exercises=[
                RoutineExerciseEntryResponseDTO(
                    id=exercise.id,
                    day_of_week=DayOfWeekDTO(exercise.day_of_week.value),
                    time_of_day=exercise.time_of_day,
                    exercise_name=exercise.exercise_name,
                    exercise_category=exercise.exercise_category,
                    duration=exercise.duration,
                    calories_burned=exercise.calories_burned,
                )
                for exercise in updated_routine.routine_exercises
            ],
        )

    def delete_user_routine(self, user_id: float, routine_id: float) -> bool:
        routine_to_delete = self.routines_repo.get_user_routine_by_id(user_id, routine_id)
        if not routine_to_delete:
            return False

        self.routines_repo.delete_routine(routine_to_delete)
        return True
