from typing import List
from fastapi import APIRouter, HTTPException, status
from src.deps.database import DBSessionDependency
from src.dtos.user_daily_calories_goal_dtos import UserDailyCaloriesGoalCreationDTO, UserDailyCaloriesGoalReponseDTO
from src.services.user_daily_calories_goal import UserDailyCaloriesGoalService

router = APIRouter(prefix="/user-daily-calories-goal", tags=["UserDailyCaloriesGoal"])

# ====================== MANAGING - USERS ====================== #


@router.post("/{user_id}", status_code=status.HTTP_201_CREATED)
def create_user_daily_calories_goal(
    user_id: float, daily_calories_goal_data: UserDailyCaloriesGoalCreationDTO, db: DBSessionDependency
) -> None:
    UserDailyCaloriesGoalService(db).create_user_daily_calories_goal(user_id, daily_calories_goal_data)


# ====================== QUERYING - USER DAILY CALORIES GOAL ====================== #


@router.get("/{user_id}", status_code=status.HTTP_200_OK)   
def get_historical_user_daily_calories_goal_data(
    user_id: float, db: DBSessionDependency
) -> List[UserDailyCaloriesGoalReponseDTO]:
    return UserDailyCaloriesGoalService(db).get_all_user_daily_calories_goal(user_id)


@router.get("/{user_id}/last", status_code=status.HTTP_200_OK)
def get_last_user_daily_calories_goal_data(
    user_id: float, db: DBSessionDependency
) -> UserDailyCaloriesGoalReponseDTO:
    user_daily_calories_goal_data = UserDailyCaloriesGoalService(db).get_last_user_daily_calories_goal(user_id)
    if user_daily_calories_goal_data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User daily calories goal not found",
        )
    else:
        return user_daily_calories_goal_data