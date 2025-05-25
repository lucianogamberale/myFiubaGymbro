import React, { useContext, createContext, useState, useEffect } from "react";

// Interfaz del usuario
interface User {
    id: number;
    name: string;
    surname: string;
    username: string;
    email: string;
    status: boolean;
}

// Interfaz del contexto de autenticación
interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    saveUser: (userData: User) => void;
    signOut: () => void;
    getUserId: () => number | null;
    getUserEmail: () => string | null;
    getUserName: () => string | null;
}

// Crea el contexto
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    saveUser: () => { },
    signOut: () => { },
    getUserId: () => null,
    getUserEmail: () => null,
    getUserName: () => null,
});

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    // Cargar usuario desde localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser: User = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(parsedUser.status);
        }
    }, []);

    function saveUser(userData: User) {
        setUser(userData);
        setIsAuthenticated(userData.status);
        localStorage.setItem("user", JSON.stringify(userData));
    }

    function signOut() {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("user");
    }

    function getUserId() {
        return user?.id ?? null;
    }

    function getUserEmail() {
        return user?.email ?? null;
    }

    function getUserName() {
        return user?.name ?? null;
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, saveUser, signOut, getUserId, getUserEmail, getUserName }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
