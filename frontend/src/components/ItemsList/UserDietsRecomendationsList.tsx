import React from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
// import Loading from '../Loading';
import bajarPeso from '../../images/bajar_peso.webp';
import ganarPeso from '../../images/ganar_peso.jpg';
import ganarMusculatura from '../../images/ganar_musculatura.jpeg';
import comidaDiabeticos from '../../images/comida_diabeticos.jpeg';
import comidaCorazon from '../../images/cuidado_corazon.webp';
import comidaVegetariana from '../../images/comida_vegetariana.jpg';
import comidaSinGluten from '../../images/sin_gluten.jpeg';
import dietaKeto from '../../images/dieta_keto.jpg';
import volumenSaludable from '../../images/volumen_saludable.jpeg';
import volumenSucio from '../../images/volumen_sucio.jpeg';
import recomendado from '../../images/recomendado.png';

export const UserDietsRecomendations = () => {
    const auth = useAuth();
    const user_id = auth.getUserId();
    console.log("hola ", user_id);
    const navigate = useNavigate();

    // ID: 1  - Dieta para Bajar de Peso  
    // ID: 2  - Dieta para Ganar Peso  
    // ID: 3  - Dieta para Ganar Musculatura  
    // ID: 4  - Dieta para Personas con Diabetes  
    // ID: 6  - Dieta para la Salud del Corazón  
    // ID: 7  - Dieta Vegetariana  
    // ID: 8  - Dieta Libre de Gluten  
    // ID: 9  - Dieta Cetogénica  
    // ID: 10 - Dieta para Volumen Saludable  
    // ID: 11 - Dieta para Volumen Sucio  

    const categories = [
        {
            title: 'Recomendados para ti',
            color: 'bg-emerald-800',
            image: recomendado,
            path: '/recomend-diets/0',
        },
        {
            title: 'Bajar de peso',
            color: 'bg-pink-600',
            image: bajarPeso,
            path: '/recomend-diets/1',
        },
        {
            title: 'Ganar peso',
            color: 'bg-yellow-700',
            image: ganarPeso,
            path: '/recomend-diets/2',
        },
        {
            title: 'Ganar musculatura',
            color: 'bg-red-700',
            image: ganarMusculatura,
            path: '/recomend-diets/3',
        },
        {
            title: 'Diabetes',
            color: 'bg-blue-700',
            image: comidaDiabeticos,
            path: '/recomend-diets/4',
        },
        {
            title: 'Cuidado del corazón',
            color: 'bg-rose-700',
            image: comidaCorazon,
            path: '/recomend-diets/6',
        },
        {
            title: 'Vegetariana',
            color: 'bg-green-700',
            image: comidaVegetariana,
            path: '/recomend-diets/7',
        },
        {
            title: 'Libre de gluten',
            color: 'bg-indigo-700',
            image: comidaSinGluten,
            path: '/recomend-diets/8',
        },
        {
            title: 'Cetogénica',
            color: 'bg-gray-800',
            image: dietaKeto,
            path: '/recomend-diets/9',
        },
        {
            title: 'Volumen saludable',
            color: 'bg-orange-700',
            image: volumenSaludable,
            path: '/recomend-diets/10',
        },
        {
            title: 'Volumen sucio',
            color: 'bg-stone-800',
            image: volumenSucio,
            path: '/recomend-diets/11',
        }
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
