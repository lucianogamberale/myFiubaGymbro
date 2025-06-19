import React from 'react';
import { useAuth } from '../../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import volumenSaludable from '../../../images/diets/volumen_saludable.jpeg';
import volumenSucio from '../../../images/diets/volumen_sucio.jpeg';

interface Category {
    title: string;
    colorFrom: string;
    colorTo: string;
    image?: string;
    path: string;
    description?: string;
}

interface UserDietsMusculaturaListProps {
    updateUserMusculaturaDiets: boolean;
    onUpdateUserMusculaturaDiets: (value: boolean) => void;
}

export const UserDietsMusculaturaList = ({ updateUserMusculaturaDiets, onUpdateUserMusculaturaDiets }: UserDietsMusculaturaListProps) => {
    const auth = useAuth();
    const user_id = auth.getUserId();
    console.log("hola ", user_id);
    const navigate = useNavigate();

    const categories: Category[] = [
        {
            title: 'Volumen saludable',
            colorFrom: 'from-orange-700',
            colorTo: 'to-orange-500',
            image: volumenSaludable,
            path: '/recomend-diets/10',
            description: 'Dieta enfocada en ganar masa con calidad y salud.',
        },
        {
            title: 'Volumen sucio',
            colorFrom: 'from-stone-800',
            colorTo: 'to-stone-600',
            image: volumenSucio,
            path: '/recomend-diets/11',
            description: 'Aumento de masa sin restricciones, ideal para ganar rápido.',
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
            <h2 className="text-3xl font-bold mb-8">Dietas para ganar musculatura</h2>
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
