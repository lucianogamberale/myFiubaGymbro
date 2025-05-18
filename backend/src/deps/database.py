from typing import Annotated

from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from src.config.env import DB_URL
from src.repositories.models.base_model import Base
from src.repositories.models.user import User
from src.repositories.models.diet import Diet, DietMeal

engine = create_engine(url=DB_URL, echo=True, pool_recycle=3600)

Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(autoflush=False, bind=engine)

# Dependency =============================


def get_db_session():
    session: Session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


DBSessionDependency = Annotated[Session, Depends(get_db_session)]

# ==========================================
