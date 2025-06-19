import React from 'react';
import { useAuth } from '../../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import runningNivelInicial from '../../../images/routines/running_nivel_inicial.jpeg';
import runningNivelMedio from '../../../images/routines/running_nivel_medio.webp';
import runningNivelAvanzado from '../../../images/routines/running_nivel_avanzado.jpg';
import trialRunning from '../../../images/routines/trail_running.jpg';

interface UserExerciseRunningListProps {
    updateUserExerciseRunning: boolean;
    onUpdateUserExerciseRunning: (value: boolean) => void;
}

export const UserExerciseRunningList = ({ updateUserExerciseRunning, onUpdateUserExerciseRunning }: UserExerciseRunningListProps) => {
    const auth = useAuth();
    const navigate = useNavigate();

    const categories = [
        {
            title: "Running Nivel Inicial",
            color: "bg-gradient-to-r from-red-300 to-red-400",
            image: runningNivelInicial,
            description: "Perfecto para empezar a construir resistencia y técnica.",
            path: "/routine-details/2.0",
            emoji: "🏃‍♂️",
        },
        {
            title: "Running Nivel Medio",
            color: "bg-gradient-to-r from-red-400 to-red-500",
            image: runningNivelMedio,
            description: "Para mejorar velocidad y resistencia sostenida.",
            path: "/routine-details/2.1",
            emoji: "🏃‍♀️",
        },
        {
            title: "Running Nivel Avanzado",
            color: "bg-gradient-to-r from-red-500 to-red-600",
            image: runningNivelAvanzado,
            description: "Entrenamientos intensos para corredores experimentados.",
            path: "/routine-details/2.2",
            emoji: "🔥",
        },
        {
            title: "Trail Running",
            color: "bg-gradient-to-r from-rose-500 to-rose-600",
            image: trialRunning,
            description: "Rutas y técnicas para correr en montaña y senderos.",
            path: "/routine-details/2.3",
            emoji: "⛰️",
        },
    ];

    return (
        <div className="h-full p-6 bg-white text-black">
            {/* Botón de volver*/}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black transition font-medium hover:underline group"
            >
                <svg
                    className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-base">Volver</span>
            </button>
            <h2 className="text-3xl font-bold mb-6">Running</h2>
            <div className="flex flex-col gap-4">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(cat.path)}
                        className={`${cat.color} rounded-xl shadow-md cursor-pointer flex items-center gap-4 p-4 hover:shadow-lg transition
                        hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:scale-[1.02]`}
                    >
                        {/* Imagen o emoji */}
                        <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex items-center justify-center overflow-hidden">
                            {cat.image ? (
                                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <span className="text-white text-3xl select-none">{cat.emoji}</span>
                            )}
                        </div>

                        {/* Texto */}
                        <div className="flex flex-col flex-1">
                            <h3 className="text-xl font-semibold text-white">{cat.title}</h3>
                            <p className="text-white opacity-90 text-sm">{cat.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
