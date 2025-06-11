
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { AiOutlineSync } from 'react-icons/ai';
import ejercicios from '../../images/routines/rutinas.jpg';
import dietas from '../../images/diets/dietas.avif';
import smartwatch from '../../images/smartwatch.png';
import garmin from '../../images/garmin.png';

const availableExerciseCategories = {
    "Fuerza": "Fuerza",
    "Cardio": "Cardio",
    "Flexibilidad": "Flexibilidad",
    "Equilibrio": "Equilibrio",
    "Resistencia": "Resistencia",
    "Velocidad": "Velocidad",
    "Agilidad": "Agilidad",
    "Coordinación": "Coordinación",
    "Potencia": "Potencia",
}

const exerciseActivitiesByCategory = {
    "Fuerza": "Levantamiento de pesas",
    "Cardio": "Correr",
    "Flexibilidad": "Yoga",
    "Equilibrio": "Tai Chi",
    "Resistencia": "Natación",
    "Velocidad": "Sprints",
    "Agilidad": "Circuitos de obstáculos",
    "Coordinación": "Baile",
    "Potencia": "Saltos pliométricos",
};


type CategoryKey = keyof typeof availableExerciseCategories;

const getRandomCategory = (): CategoryKey => {
    const keys = Object.keys(availableExerciseCategories) as CategoryKey[];
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
};

export const UserHome = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const user_id = auth.getUserId();

    const [synced, setSynced] = useState(false);
    const [showSyncModal, setShowSyncModal] = useState(false);

    const handleSync = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/sync/${user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    app_name: '1',
                }),
            });
            if (response.ok) {
                console.log("Creado con éxito");
                setSynced(true);
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
        }
    };

    const handleUpdate = async (isSync: boolean) => {
        try {
            const randomCategory = getRandomCategory();
            const exerciseName = exerciseActivitiesByCategory[randomCategory];

            const now = new Date();
            let date: string;

            if (isSync) {
                const daysAgo = Math.floor(Math.random() * 30); // hasta 30 días atrás
                const randomDate = new Date(now);
                randomDate.setDate(now.getDate() - daysAgo);
                date = randomDate.toISOString();
            } else {
                date = now.toISOString();
            }

            const response = await fetch(`http://localhost:8000/api/user-exercises/${user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exercise_category: randomCategory,
                    exercise_name: exerciseName,
                    calories: Math.floor(Math.random() * (2000 - 500 + 1)) + 500,
                    date: date,
                    duration: Math.floor(Math.random() * (120 - 30 + 1)) + 30
                }),
            });
            if (response.ok) {
                console.log("Ejercicio creado con éxito");
            }
        } catch (error) {
            console.error("Error al crear ejercicio:", error);
        }
    };


    useEffect(() => {
        const getSyncState = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/sync/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data && Object.keys(data).length > 0) {
                        setSynced(true);
                        console.log("Sincronizaciones obtenidas:", data);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getSyncState();
    }, [user_id]);

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
            path: '/diets-recommendation',
        },
        {
            title: 'Sincronización',
            description: 'Sincroniza tus datos con dispositivos externos para un seguimiento más preciso.',
            colorFrom: 'from-sky-700',
            colorTo: 'to-sky-400',
            image: smartwatch,
            imageLogo: garmin,
            path: '/sync',
            isSync: true
        }
    ];

    const SyncModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-xl shadow-lg text-center">
                <p className="text-lg font-semibold mb-2">Conectando con tu cuenta Garmin Connect</p>
                <p className="text-lg font-semibold mb-2">Usuario:{auth.getUserEmail()}</p>
                <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                <p className="mt-2 text-sm text-gray-600">Esto puede tardar unos segundos</p>
            </div>
        </div>
    );

    return (
        <div className="h-full p-6 bg-white text-black">
            <h2 className="text-3xl font-bold mb-8">¡Hola {auth.getUserName()}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            if (!cat.isSync) navigate(cat.path);
                        }}
                        className={`relative overflow-hidden cursor-pointer rounded-2xl shadow-lg bg-gradient-to-r ${cat.colorFrom} ${cat.colorTo} text-white p-6 flex flex-col md:flex-row items-center gap-6
                                   hover:shadow-2xl transition-shadow transform hover:-translate-y-1 hover:scale-[1.02]
                                   ${cat.isSync ? 'md:col-span-2' : ''}`}
                    >
                        {cat.isSync && (
                            <img
                                src={cat.image}
                                alt="Smartwatch"
                                className="absolute w-64 md:w-80 opacity-20 rotate-12 -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 z-0 pointer-events-none select-none"
                            />
                        )}

                        <div className="flex flex-col flex-1 z-10">
                            <h3 className="text-2xl font-semibold mb-2">{cat.title}</h3>
                            <p className="mb-4 text-sm opacity-90">{cat.description}</p>
                            {cat.isSync ? (
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        if (!synced) {
                                            setShowSyncModal(true); // mostrar modal
                                            setTimeout(() => setShowSyncModal(false), 5000);
                                            handleSync();


                                            const times = Math.floor(Math.random() * 5) + 1;
                                            for (let i = 0; i < times; i++) {
                                                handleUpdate(true);
                                            }
                                        } else {
                                            setShowSyncModal(true); // mostrar modal
                                            setTimeout(() => setShowSyncModal(false), 5000);
                                            handleSync();
                                            const randomBool = Math.random() < 0.7;
                                            if (randomBool) {
                                                handleUpdate(false);
                                            }
                                        }
                                    }}
                                    className="self-start bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-shadow shadow-sm hover:shadow-md flex items-center gap-1"
                                >
                                    {/* {synced ? 'Actualizar' : 'Sincronizar'} <FiArrowRight />*/}
                                    {synced ? 'Actualizar' : 'Sincronizar'} {synced ? <FiRefreshCw /> : <AiOutlineSync />}
                                </button>
                            ) : (
                                <button
                                    onClick={e => {
                                        e.stopPropagation();
                                        navigate(cat.path);
                                    }}
                                    className="self-start bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-shadow shadow-sm hover:shadow-md flex items-center gap-1"
                                >
                                    Ver más <FiArrowRight />
                                </button>
                            )}
                        </div>

                        {!cat.isSync ? (
                            <div className="flex-shrink-0 order-2 md:order-2 z-10">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-32 h-32 rounded-xl object-cover shadow-lg"
                                />
                            </div>
                        ) : (
                            <img
                                src={cat.imageLogo}
                                alt={cat.title}
                                className="w-36 h-36 rounded-xl object-contain shadow-xl z-10"
                            />
                        )}
                    </div>
                ))}
            </div>
            {showSyncModal && <SyncModal />}
        </div >
    );
};