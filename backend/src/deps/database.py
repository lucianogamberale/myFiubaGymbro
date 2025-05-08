from typing import Annotated

from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from src.config.env import DB_URL

engine = create_engine(url=DB_URL)
SessionLocal = sessionmaker(autoflush=False, bind=engine)

# Dependency =============================


def get_db_session():
    session: Session = SessionLocal(engine)
    try:
        yield session
    finally:
        session.close()


DBSessionDependency = Annotated[Session, Depends(get_db_session)]

# ==========================================
