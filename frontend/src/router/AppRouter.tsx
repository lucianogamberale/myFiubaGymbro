import { Routes, Route, Navigate } from "react-router-dom";
import { UserFoods } from "../pages/UserFoods";
import { UserExercises } from "../pages/UserExercises";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import { UserHealthData } from "../pages/UserHealthData";
import { UserDiets } from "../pages/UserDiets";
import { UserRoutines } from "../pages/UserRoutines";
import { UserObjectives } from "../pages/UserObjectives";
import { UserRecomendations } from "../pages/Home";
import { UserDailyCaloriesGoal } from "../pages/UserDailyCaloriesGoal";
import { DietsDetail } from "../pages/DietDetail";
import { UserDietsMusculatura } from "../pages/SubDiets/DietDetailMusculatura";
import { ExerciseRecomendation } from "../pages/ExerciseRecomendation";
import { ExerciseDetail } from "../pages/ExerciseDetail";


export const AppRouter = () => {
  return (
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* RUTAS PROTEGIDAS */}
      <Route path="/home" element={<ProtectedRoute />}>
        <Route path="/home" element={<UserRecomendations />} />
      </Route>
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
      <Route path="/user-routines" element={<ProtectedRoute />}>
        <Route path="/user-routines" element={<UserRoutines />} />
      </Route>
      <Route path="/user-objectives" element={<ProtectedRoute />}>
        <Route path="/user-objectives" element={<UserObjectives />} />
      </Route>
      <Route path="/user-diets" element={<ProtectedRoute />}>
        <Route path="/user-diets" element={<UserDiets />} />
      </Route>
      <Route path="/musculatura-diets" element={<ProtectedRoute />}>
        <Route path="/musculatura-diets" element={<UserDietsMusculatura />} />
      </Route>
      <Route path="/recomend-exercise" element={<ProtectedRoute />}>
        <Route path="/recomend-exercise" element={<ExerciseRecomendation />} />
      </Route>
      <Route path="/recomend-diets/:type" element={<ProtectedRoute />}>
        <Route path="/recomend-diets/:type" element={<DietsDetail />} />
      </Route>
      <Route path="/detail-exercise/:type" element={<ProtectedRoute />}>
        <Route path="/detail-exercise/:type" element={<ExerciseDetail />} />
      </Route>

      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/*" element={<Navigate to="/signup" />} />
    </Routes>
  )
}
