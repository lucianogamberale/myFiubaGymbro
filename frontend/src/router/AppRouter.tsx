import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import { UserHealthData } from "../pages/UserHealthData";
import { UserDiets } from "../pages/UserDiets";
import { UserRoutines } from "../pages/UserRoutines";
import { UserObjectives } from "../pages/UserObjectives";
import { UserDailyCaloriesGoal } from "../pages/UserDailyCaloriesGoal";
import { HomePage } from "../pages/Home";
import { DietsDetail } from "../pages/DietDetail";
import { ExerciseDetail } from "../pages/RoutineDetail";

{/*Recomendaciones de dietas*/ }
import { UserRecomendations } from "../pages/DietRecommendation";
import { UserDietsMusculatura } from "../pages/SubDiets/MuscularDiets";

{/*Recomendaciones de rutinas*/ }
import { ExerciseRecomendation } from "../pages/RoutineRecommendation";
import { UserExerciseMusculatura } from "../pages/SubRoutines/MuscularRoutines";
import { UserExerciseRunning } from "../pages/SubRoutines/RunningRoutines";
import { UserExerciseYoga } from "../pages/SubRoutines/YogaRoutines";


export const AppRouter = () => {
  return (
    <Routes>
      {/* RUTAS PUBLICAS */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* RUTAS PROTEGIDAS */}
      <Route path="/home" element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
      <Route path="/user-health-data" element={<ProtectedRoute />}>
        <Route path="/user-health-data" element={<UserHealthData />} />
      </Route>
      <Route path="/user-daily-calories-goal" element={<ProtectedRoute />}>
        <Route path="/user-daily-calories-goal" element={<UserDailyCaloriesGoal />} />
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

      {/*Recomendaciones de dietas*/}
      <Route path="/diets-recommendation" element={<ProtectedRoute />}>
        <Route path="/diets-recommendation" element={<UserRecomendations />} />
      </Route>
      <Route path="/musculatura-diets" element={<ProtectedRoute />}>
        <Route path="/musculatura-diets" element={<UserDietsMusculatura />} />
      </Route>
      <Route path="/recomend-diets/:type" element={<ProtectedRoute />}>
        <Route path="/recomend-diets/:type" element={<DietsDetail />} />
      </Route>

      {/*Recomendaciones de rutinas*/}
      <Route path="/routines-recommendation" element={<ProtectedRoute />}>
        <Route path="/routines-recommendation" element={<ExerciseRecomendation />} />
      </Route>
      <Route path="/muscular-routines" element={<ProtectedRoute />}>
        <Route path="/muscular-routines" element={<UserExerciseMusculatura />} />
      </Route>
      <Route path="/running-routines" element={<ProtectedRoute />}>
        <Route path="/running-routines" element={<UserExerciseRunning />} />
      </Route>
      <Route path="/yoga-routines" element={<ProtectedRoute />}>
        <Route path="/yoga-routines" element={<UserExerciseYoga />} />
      </Route>
      <Route path="/routine-details/:type" element={<ProtectedRoute />}>
        <Route path="/routine-details/:type" element={<ExerciseDetail />} />
      </Route>

      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/*" element={<Navigate to="/signup" />} />
    </Routes >
  )
}
