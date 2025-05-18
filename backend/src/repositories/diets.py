import sqlalchemy as sa
from sqlalchemy.orm import Session
from typing import Optional

from src.dtos.diet_dtos import DietCreationDTO, DietUpdateDTO
from src.repositories.models.diet import Diet, DietMeal, DayOfWeek

from .base import BaseRepository


class DietsRepository(BaseRepository):
    """
    Repositorio para gestionar las operaciones de base de datos relacionadas con las dietas.
    """
    def __init__(self, db_session: Session):
        super().__init__(db_session)

    def save_new_diet(self, user_id: float, diet_data: DietCreationDTO) -> Diet:
        """
        Guarda una nueva dieta y sus comidas asociadas en la base de datos.
        """
        diet = Diet(
            user_id=user_id,
            name=diet_data.name,
            description=diet_data.description
        )
        self.db_session.add(diet)
        self.db_session.flush()

        for meal_data in diet_data.meals:
            diet_meal = DietMeal(
                diet_id=diet.id,
                day_of_week=meal_data.day_of_week.value,
                time_of_day=meal_data.time_of_day,
                food_name=meal_data.food_name,
                food_category=meal_data.food_category,
                calories=meal_data.calories
            )
            self.db_session.add(diet_meal)

        self.db_session.commit()
        self.db_session.refresh(diet)
        return diet

    def get_all_user_diets(self, user_id: float) -> list[Diet]:
        """
        Obtiene todas las dietas de un usuario, cargando también sus comidas.
        """
        query = sa.select(Diet).where(Diet.user_id == user_id).options(sa.orm.selectinload(Diet.diet_meals))
        result = self.db_session.execute(query)
        return result.scalars().all()

    def get_user_diet_by_id(self, user_id: float, diet_id: float) -> Optional[Diet]:
        """
        Obtiene una dieta específica de un usuario por su ID, cargando también sus comidas.
        """
        query = (
            sa.select(Diet)
            .where(Diet.user_id == user_id, Diet.id == diet_id)
            .options(sa.orm.selectinload(Diet.diet_meals))
        )
        result = self.db_session.execute(query)
        return result.scalar_one_or_none()

    def update_diet(self, diet: Diet, diet_data: DietUpdateDTO) -> Diet:
        """
        Actualiza una dieta existente.
        Elimina las comidas existentes y crea las nuevas basadas en diet_data.
        """
        diet.name = diet_data.name
        diet.description = diet_data.description

        diet.diet_meals.clear()

        for meal_data in diet_data.meals:
             diet_meal = DietMeal(
                diet_id=diet.id,
                day_of_week=meal_data.day_of_week.value,
                time_of_day=meal_data.time_of_day,
                food_name=meal_data.food_name,
                food_category=meal_data.food_category,
                calories=meal_data.calories
            )
             diet.diet_meals.append(diet_meal)

        self.db_session.commit()
        self.db_session.refresh(diet)
        return diet

    def delete_diet(self, diet: Diet) -> None:
        """
        Elimina una dieta de la base de datos.
        Las comidas asociadas se eliminarán automáticamente debido a ondelete="CASCADE".
        """
        self.db_session.delete(diet)
        self.db_session.commit()

