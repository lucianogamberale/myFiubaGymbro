import React from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ejercicios from '../../images/diets/bajar_peso.webp';
import dietas from '../../images/diets/recomendado.png';

export const UserHome = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const categories = [
        {
            title: 'Rutinas recomendadas',
            description: 'Basado en tu objetivo y progreso para mejorar tu fuerza y resistencia.',
            colorFrom: 'from-orange-600',
            colorTo: 'to-orange-400',
            image: ejercicios,
            path: '/routines-recommendation',
        },
        {
            title: 'Dietas recomendadas',
            description: 'Personalizadas para tu perfil y metas nutricionales.',
            colorFrom: 'from-emerald-800',
            colorTo: 'to-emerald-500',
            image: dietas,
            path: '/diet-recommendations',
        }
    ];

    return (
        <div className="h-full p-6 bg-white text-black">
            <h2 className="text-3xl font-bold mb-8">¡Hola {auth.getUserName()}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(cat.path)}
                        className={`cursor-pointer rounded-2xl shadow-lg bg-gradient-to-r ${cat.colorFrom} ${cat.colorTo} text-white p-6 flex flex-col md:flex-row items-center gap-6
                                   hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:scale-[1.02]`}
                    >
                        {/* Texto Izquierda en desktop, arriba en móvil */}
                        <div className="flex flex-col flex-1 order-1 md:order-1">
                            <h3 className="text-2xl font-semibold mb-2">{cat.title}</h3>
                            <p className="mb-4 text-sm opacity-90">{cat.description}</p>
                            <button
                                onClick={e => {
                                    e.stopPropagation();
                                    navigate(cat.path);
                                }}
                                className="self-start bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-shadow shadow-sm hover:shadow-md flex items-center gap-1"
                            >
                                Ver más <FiArrowRight />
                            </button>
                        </div>
                        {/* Imagen Derecha en desktop, abajo en móvil */}
                        <div className="flex-shrink-0 order-2 md:order-2">
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-32 h-32 rounded-xl object-cover shadow-lg"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
