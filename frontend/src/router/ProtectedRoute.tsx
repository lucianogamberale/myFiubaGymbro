import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"

export default function ProtectedRoute() {
    const auth = useAuth()
    const isAuthenticated = auth.isAuthenticated;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}