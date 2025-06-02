import { Routes, Route, Navigate } from "react-router-dom";
import { UserFoods } from "../pages/UserFoods";
import { UserExercises } from "../pages/UserExercises";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import { UserHealthData } from "../pages/UserHealthData";
import { UserDiets } from "../pages/UserDiets";
import { UserObjectives } from "../pages/UserObjectives";
import { UserSleepRecord } from "../pages/UserSleepRecord";
import { UserDailyCaloriesGoal } from "../pages/UserDailyCaloriesGoal";

export const AppRouter = () => {
  return (
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* RUTAS PROTEGIDAS */}
      <Route path="/user-health-data" element={<ProtectedRoute />}>
        <Route path="/user-health-data" element={<UserHealthData />} />
      </Route>
      <Route path="/user-daily-calories-goal" element={<ProtectedRoute />}>
        <Route path="/user-daily-calories-goal" element={<UserDailyCaloriesGoal />} />
      </Route>
      <Route path="/user-foods" element={<ProtectedRoute />}>
        <Route path="/user-foods" element={<UserFoods />} />
      </Route>
      <Route path="/user-exercises" element={<ProtectedRoute />}>
        <Route path="/user-exercises" element={<UserExercises />} />
      </Route>
      <Route path="/user-diets" element={<ProtectedRoute />}>
        <Route path="/user-diets" element={<UserDiets />} />
      </Route>
      <Route path="/user-objectives" element={<ProtectedRoute />}>
        <Route path="/user-objectives" element={<UserObjectives />} />
      </Route>
      <Route path="/user-hours-slept" element={<ProtectedRoute />}>
        <Route path="/user-hours-slept" element={<UserSleepRecord />} />
      </Route>

      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/*" element={<Navigate to="/signup" />} />
    </Routes>
  )
}
