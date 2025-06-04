from typing import List, Optional, Sequence

import sqlalchemy as sa
from src.dtos.routine_dtos import RoutineCreationDTO, RoutineUpdateDTO
from src.repositories.models.routine import Routine, RoutineExercise

from .base import BaseRepository


class RoutinesRepository(BaseRepository):
    def save_new_routine(self, user_id: float, routine_data: RoutineCreationDTO) -> Routine:
        routine = Routine(
            user_id=user_id, name=routine_data.name, description=routine_data.description
        )
        self.db_session.add(routine)
        self.db_session.flush()

        for exercise_data in routine_data.exercises:
            routine_exercise = RoutineExercise(
                routine_id=routine.id,
                day_of_week=exercise_data.day_of_week.value,
                time_of_day=exercise_data.time_of_day,
                exercise_name=exercise_data.exercise_name,
                exercise_category=exercise_data.exercise_category,
                duration=exercise_data.duration,
                calories_burned=exercise_data.calories_burned,
            )
            self.db_session.add(routine_exercise)

        self.db_session.commit()
        self.db_session.refresh(routine)
        return routine

    def get_all_user_routines(self, user_id: float) -> Sequence[Routine]:
        query = (
            sa.select(Routine)
            .where(Routine.user_id == user_id)
            .options(sa.orm.selectinload(Routine.routine_exercises))
        )
        result = self.db_session.execute(query)
        return result.scalars().all()

    def get_user_routine_by_id(self, user_id: float, routine_id: float) -> Optional[Routine]:
        query = (
            sa.select(Routine)
            .where(Routine.user_id == user_id, Routine.id == routine_id)
            .options(sa.orm.selectinload(Routine.routine_exercises))
        )
        result = self.db_session.execute(query)
        return result.scalar_one_or_none()

    def update_routine(self, routine: Routine, routine_data: RoutineUpdateDTO) -> Routine:
        routine.name = routine_data.name
        routine.description = routine_data.description

        routine.routine_exercises.clear()

        for exercise_data in routine_data.exercises:
            routine_exercise = RoutineExercise(
                routine_id=routine.id,
                day_of_week=exercise_data.day_of_week.value,
                time_of_day=exercise_data.time_of_day,
                exercise_name=exercise_data.exercise_name,
                exercise_category=exercise_data.exercise_category,
                duration=exercise_data.duration,
                calories_burned=exercise_data.calories_burned,
            )
            routine.routine_exercises.append(routine_exercise)

        self.db_session.commit()
        self.db_session.refresh(routine)
        return routine

    def delete_routine(self, routine: Routine) -> None:
        self.db_session.delete(routine)
        self.db_session.commit()
