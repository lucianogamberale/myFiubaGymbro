import React from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
// import Loading from '../Loading';
import volumenSaludable from '../../images/volumen_saludable.jpeg';
import volumenSucio from '../../images/volumen_sucio.jpeg';

export const UserDietsMusculaturaList = () => {
    const auth = useAuth();
    const user_id = auth.getUserId();
    console.log("hola ", user_id);
    const navigate = useNavigate();

    const categories = [
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
