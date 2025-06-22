import React from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

import bajarPeso from '../../images/diets/bajar_peso.webp';
import ganarPeso from '../../images/diets/ganar_peso.jpg';
import ganarMusculatura from '../../images/diets/ganar_musculatura.jpeg';
import comidaDiabeticos from '../../images/diets/comida_diabeticos.jpeg';
import comidaCorazon from '../../images/diets/cuidado_corazon.webp';
import comidaVegetariana from '../../images/diets/comida_vegetariana.jpg';
import comidaSinGluten from '../../images/diets/sin_gluten.jpeg';
import dietaKeto from '../../images/diets/dieta_keto.jpg';
import recomendado from '../../images/recomendado.png';

interface Category {
    title: string;
    colorFrom: string;
    colorTo: string;
    image: string;
    path: string;
    description?: string;
}

interface UserDietsRecomendationsProps {
    updateDietRecomendations: boolean;
    onUpdateDietRecomendations: (value: boolean) => void;
}

export const UserDietsRecomendations = ({ 
    updateDietRecomendations, 
    onUpdateDietRecomendations 
}: UserDietsRecomendationsProps) => {
    const auth = useAuth();
    const navigate = useNavigate();

    const categories: Category[] = [
        {
            title: 'Recomendados para ti',
            colorFrom: 'from-emerald-800',
            colorTo: 'to-emerald-500',
            image: recomendado,
            path: '/recomend-diets/0',
            description: 'Dietas personalizadas según tu salud y objetivos.',
        },
        {
            title: 'Bajar de peso',
            colorFrom: 'from-pink-600',
            colorTo: 'to-pink-400',
            image: bajarPeso,
            path: '/recomend-diets/1',
            description: 'Planes bajos en calorías y grasas para perder peso de forma saludable.',
        },
        {
            title: 'Ganar peso',
            colorFrom: 'from-yellow-700',
            colorTo: 'to-yellow-500',
            image: ganarPeso,
            path: '/recomend-diets/2',
            description: 'Dietas hipercalóricas para aumentar tu masa corporal.',
        },
        {
            title: 'Ganar musculatura',
            colorFrom: 'from-red-700',
            colorTo: 'to-red-500',
            image: ganarMusculatura,
            path: '/musculatura-diets',
            description: 'Comidas con alto contenido proteico para favorecer el crecimiento muscular.',
        },
        {
            title: 'Diabetes',
            colorFrom: 'from-blue-700',
            colorTo: 'to-blue-500',
            image: comidaDiabeticos,
            path: '/recomend-diets/4',
            description: 'Planes con bajo índice glucémico pensados para diabéticos.',
        },
        {
            title: 'Cuidado del corazón',
            colorFrom: 'from-rose-700',
            colorTo: 'to-rose-500',
            image: comidaCorazon,
            path: '/recomend-diets/6',
            description: 'Dietas ricas en fibras y grasas saludables para tu corazón.',
        },
        {
            title: 'Vegetariana',
            colorFrom: 'from-green-700',
            colorTo: 'to-green-700',
            image: comidaVegetariana,
            path: '/recomend-diets/7',
            description: 'Opciones balanceadas sin productos de origen animal.',
        },
        {
            title: 'Libre de gluten',
            colorFrom: 'from-indigo-700',
            colorTo: 'to-indigo-500',
            image: comidaSinGluten,
            path: '/recomend-diets/8',
            description: 'Ideal para personas con celiaquía o sensibilidad al gluten.',
        },
        {
            title: 'Cetogénica',
            colorFrom: 'from-gray-800',
            colorTo: 'to-gray-600',
            image: dietaKeto,
            path: '/recomend-diets/9',
            description: 'Dietas bajas en carbohidratos para entrar en cetosis.',
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
            <h2 className="text-3xl font-bold mb-8">Dietas</h2>
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
                                onClick={(e) => {
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
