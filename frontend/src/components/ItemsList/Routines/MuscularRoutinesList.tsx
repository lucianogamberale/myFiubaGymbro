import React from 'react';
import { useAuth } from '../../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import musculaturaNivelInicial from '../../../images/routines/musculatura_nivel_inicial.jpg';
import musculaturaNivelMedio from '../../../images/routines/musculatura_medio.jpg';
import musculaturaNivelAvanzado from '../../../images/routines/musculatura_avanzado.webp';
import tonificacion from '../../../images/routines/tonificacion.webp';

interface UserExerciseMusculaturaListProps {
    updateUserExerciseMusculatura: boolean;
    onUpdateUserExerciseMusculatura: (value: boolean) => void;
}

export const UserExerciseMusculaturaList = ({ updateUserExerciseMusculatura, onUpdateUserExerciseMusculatura }: UserExerciseMusculaturaListProps) => {
    const auth = useAuth();
    const navigate = useNavigate();

    const categories = [
        {
            title: "Musculatura Nivel Inicial",
            color: "bg-gradient-to-r from-blue-300 to-blue-400",
            image: musculaturaNivelInicial,
            description: "Perfecto para empezar con fuerza y técnica básica.",
            path: "/routine-details/1.0",
        },
        {
            title: "Musculatura Nivel Medio",
            color: "bg-gradient-to-r from-blue-400 to-blue-500",
            image: musculaturaNivelMedio,
            description: "Para quienes quieren aumentar volumen y resistencia.",
            path: "/routine-details/1.1",
        },
        {
            title: "Musculatura Nivel Alto",
            color: "bg-gradient-to-r from-blue-500 to-blue-600",
            image: musculaturaNivelAvanzado,
            description: "Entrenamientos intensos para usuarios avanzados.",
            path: "/routine-details/1.2",
        },
        {
            title: "Tonificación Corporal",
            color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
            image: tonificacion,
            description: "Rutinas para definir y tonificar tu cuerpo.",
            path: "/routine-details/1.3",
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
            <h2 className="text-3xl font-bold mb-6">Musculatura</h2>
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
                                <span className="text-white text-3xl select-none">{"💪"}</span>
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
