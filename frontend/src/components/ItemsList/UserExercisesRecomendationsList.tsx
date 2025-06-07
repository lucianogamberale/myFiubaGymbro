import React from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
// import Loading from '../Loading';
// import bajarPeso from '../../images/bajar_peso.webp';
// import ganarPeso from '../../images/ganar_peso.jpg';
// import ganarMusculatura from '../../images/ganar_musculatura.jpeg';
// import comidaDiabeticos from '../../images/comida_diabeticos.jpeg';
// import comidaCorazon from '../../images/cuidado_corazon.webp';
// import comidaVegetariana from '../../images/comida_vegetariana.jpg';
// import comidaSinGluten from '../../images/sin_gluten.jpeg';
// import dietaKeto from '../../images/dieta_keto.jpg';
import undefined from '../../images/recomendado.png';

export const UserExerciseRecomendationList = () => {
    const auth = useAuth();
    const user_id = auth.getUserId();
    console.log("hola ", user_id);
    const navigate = useNavigate();

    // const categories = [
    //     {
    //         title: 'Recomendados para ti',
    //         color: 'bg-emerald-800',
    //         image: recomendado,
    //         path: '/detail-exercise/0',
    //     },
    //     {
    //         title: 'INFLATE COMO UN SAPO',
    //         color: 'bg-pink-600',
    //         image: bajarPeso,
    //         path: '/detail-exercise/1',
    //     },
    // ];
    const categories = [
        {
            title: "Musculatura Nivel Medio",
            color: "bg-blue-700",
            image: undefined, // Pon acá la imagen que quieras
            path: "/detail-exercise/2",
        },
        {
            title: "Musculatura Nivel Alto",
            color: "bg-red-700",
            image: undefined,
            path: "/detail-exercise/3",
        },
        {
            title: "Tonificación Corporal",
            color: "bg-yellow-600",
            image: undefined,
            path: "/detail-exercise/4",
        },
        {
            title: "Running",
            color: "bg-green-700",
            image: undefined,
            path: "/detail-exercise/5",
        },
        {
            title: "Ciclismo",
            color: "bg-indigo-700",
            image: undefined,
            path: "/detail-exercise/6",
        },
        {
            title: "Natación",
            color: "bg-teal-600",
            image: undefined,
            path: "/detail-exercise/7",
        },
        {
            title: "Boxeo",
            color: "bg-pink-600",
            image: undefined,
            path: "/detail-exercise/8",
        },
        {
            title: "Entrenamiento Funcional",
            color: "bg-purple-700",
            image: undefined,
            path: "/detail-exercise/9",
        },
        {
            title: "Yoga",
            color: "bg-cyan-600",
            image: undefined,
            path: "/detail-exercise/10",
        },
        {
            title: "CrossFit",
            color: "bg-orange-600",
            image: undefined,
            path: "/detail-exercise/11",
        },
    ];

    return (
        <div className="h-full p-4 bg-white text-black">
            <h2 className="text-3xl font-bold mb-6">Explorar todo</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat, idx) => (
                    <div
                        key={idx}
                        onClick={() => navigate(cat.path)}
                        className={`relative rounded-lg overflow-hidden ${cat.color} h-36 flex items-start justify-between p-4 cursor-pointer hover:opacity-90 transition`}
                    >
                        <h3 className="text-2xl font-semibold text-white z-10">{cat.title}</h3>
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-24 h-24 object-cover rotate-[20deg] absolute bottom-[-10px] right-[-10px] shadow-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
