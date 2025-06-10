import React from 'react';
import { useAuth } from '../../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const UserExerciseYogaList = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const categories = [
        {
            title: "Yoga Nivel Inicial",
            color: "bg-gradient-to-r from-purple-300 to-purple-400",
            image: undefined,
            description: "Perfecto para empezar a construir resistencia y técnica.",
            path: "/routine-details/3.0",
            emoji: "🧘",
        },
        {
            title: "Yoga Nivel Medio",
            color: "bg-gradient-to-r from-purple-400 to-purple-500",
            image: undefined,
            description: "Para mejorar velocidad y resistencia sostenida.",
            path: "/routine-details/3.1",
            emoji: "🌀",
        },
        {
            title: "Yoga Nivel Avanzado",
            color: "bg-gradient-to-r from-indigo-500 to-purple-600",
            image: undefined,
            description: "Entrenamientos intensos para corredores experimentados.",
            path: "/routine-details/3.2",
            emoji: "⚡",
        },
        {
            title: "Yoga Restaurativo",
            color: "bg-gradient-to-r from-rose-400 to-purple-500",
            image: undefined,
            description: "Relajación profunda y respiración consciente.",
            path: "/routine-details/3.3",
            emoji: "🌙",
        },
    ];

    return (
        <div className="h-full p-6 bg-white text-black">
            <h2 className="text-3xl font-bold mb-6">Yoga</h2>
            <div className="flex flex-col gap-4">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(cat.path)}
                        className={`${cat.color} rounded-xl shadow-md cursor-pointer flex items-center gap-4 p-4 hover:shadow-lg transition
                        hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:scale-[1.02]`}
                    >
                        {/* Emoji como placeholder */}
                        <div className="w-20 h-20 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-white text-3xl select-none">
                            {cat.emoji}
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
