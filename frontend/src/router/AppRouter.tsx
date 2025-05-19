import { Routes, Route, Navigate } from "react-router-dom";
import { UserFoods } from "../pages/UserFoods";
import { UserExercises } from "../pages/UserExercises";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import { UserHealthData } from "../pages/UserHealthData";

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
      <Route path="/user-foods" element={<ProtectedRoute />}>
        <Route path="/user-foods" element={<UserFoods />} />
      </Route>
      <Route path="/user-exercises" element={<ProtectedRoute />}>
        <Route path="/user-exercises" element={<UserExercises />} />
      </Route>

      <Route path="/" element={<Navigate to="/signup" />} />
      <Route path="/*" element={<Navigate to="/signup" />} />
    </Routes>
  )
}

//   <Routes>

//     {/*RUTAS PUBLICAS  */}
//     <Route path="/signup" element={<SignUp />} />
//     <Route path="/login" element = {<Login/>} />


//     {/* RUTAS PROTEGIDAS */}
//     <Route path="/grupos" element={<ProtectedRoute />}>
//       <Route path="/grupos" element = {<Grupos/>} />
//     </Route>
//     <Route path="/grupo" element={<ProtectedRoute />}>
//       <Route path="/grupo/:id" element={<Grupo />} />
//     </Route>
//     <Route path="/historial" element={<ProtectedRoute />}>
//       <Route path="/historial" element = {<Historial/>} />
//     </Route>

//     <Route path="/" element = {<Navigate to="/signup" />} />
//     <Route path="/*" element = { <Navigate to="/signup" />} />
// </Routes>