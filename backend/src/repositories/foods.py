import sqlalchemy as sa
from src.repositories.models.food import Food

from .base import BaseRepository


class FoodsRepository(BaseRepository):
    def save_new_food(self, food_name: str, food_category: str) -> Food:
        food = Food(
            name=food_name,
            category=food_category,
        )

        self.db_session.add(food)
        self.db_session.commit()
        self.db_session.refresh(food)
        return food

    def get_food_named(self, food_name: str, food_category: str) -> Food | None:
        return (
            self.db_session.query(Food)
            .filter(
                sa.and_(
                    Food.name == food_name,
                    Food.category == food_category,
                )
            )
            .first()
        )
