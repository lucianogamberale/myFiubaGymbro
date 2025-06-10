import React from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import musculatura from '../../images/routines/musculatura.webp';
import running from '../../images/routines/running.jpeg';
import yoga from '../../images/routines/yoga.jpg';
import recomendado from '../../images/recomendado.png';
interface Category {
    title: string;
    colorFrom: string;
    colorTo: string;
    image?: string;
    path: string;
    description?: string;
}

export const UserExerciseRecomendationList = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const categories: Category[] = [
        {
            title: 'Recomendados para ti',
            colorFrom: 'from-emerald-700',
            colorTo: 'to-emerald-500',
            image: recomendado,
            path: '/routine-details/0',
            description: 'Ejercicios personalizados según tu progreso y objetivos.',
        },
        {
            title: "Musculatura",
            colorFrom: "from-blue-700",
            colorTo: "to-blue-500",
            image: musculatura,
            path: "/muscular-routines",
            description: 'Rutinas para ganar fuerza y masa muscular.',
        },
        {
            title: "Running",
            colorFrom: "from-red-700",
            colorTo: "to-red-500",
            image: running,
            path: "/running-routines",
            description: 'Entrenamientos para mejorar tu resistencia y velocidad.',
        },
        {
            title: "Yoga y Flexibilidad",
            colorFrom: "from-purple-700",
            colorTo: "to-purple-500",
            image: yoga,
            path: "/yoga-routines",
            description: 'Ejercicios para mejorar tu flexibilidad y relajación.',
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
            <h2 className="text-3xl font-bold mb-8">Ejercicios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(cat.path)}
                        className={`cursor-pointer rounded-2xl shadow-lg p-6 flex items-center gap-6 hover:shadow-2xl transition-shadow relative bg-gradient-to-r ${cat.colorFrom} ${cat.colorTo} text-white 
                        hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:scale-[1.02]`}
                    >
                        {/* Texto */}
                        <div className="flex flex-col flex-1 z-10">
                            <h3 className="text-2xl font-semibold mb-2">{cat.title}</h3>
                            {cat.description && (
                                <p className="text-sm opacity-90 mb-4">{cat.description}</p>
                            )}
                            <button
                                onClick={e => {
                                    e.stopPropagation();
                                    navigate(cat.path);
                                }}
                                className="self-start bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
                            >
                                Ver más
                            </button>
                        </div>
                        {/* Imagen */}
                        {cat.image && (
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-32 h-32 rounded-xl object-cover shadow-lg rotate-[15deg]"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
