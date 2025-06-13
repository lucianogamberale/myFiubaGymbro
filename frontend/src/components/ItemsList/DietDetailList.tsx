import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { diets } from '../../utils/constants/diets';

const categoryColors: Record<string, { colorFrom: string; colorTo: string }> = {
    '0': { colorFrom: 'from-emerald-800', colorTo: 'to-emerald-500' },
    '1': { colorFrom: 'from-pink-600', colorTo: 'to-pink-400' },
    '2': { colorFrom: 'from-yellow-700', colorTo: 'to-yellow-500' },
    '4': { colorFrom: 'from-blue-700', colorTo: 'to-blue-500' },
    '6': { colorFrom: 'from-rose-700', colorTo: 'to-rose-500' },
    '7': { colorFrom: 'from-green-700', colorTo: 'to-green-500' },
    '8': { colorFrom: 'from-indigo-700', colorTo: 'to-indigo-500' },
    '9': { colorFrom: 'from-gray-800', colorTo: 'to-gray-600' },
    '10': { colorFrom: 'from-orange-700', colorTo: 'to-orange-500' },
    '11': { colorFrom: 'from-stone-800', colorTo: 'to-stone-600' },
};


export type UserHealthDataEntry = {
    id: number;
    weight: number;
    height: number;
    date: string;
};

interface DietMealEntryForm {
    food_name: string;
    food_category: string;
    day_of_week: string;
    time_of_day: string;
    calories: number;
}

interface DietForm {
    name: string;
    description?: string;
    meals: DietMealEntryForm[];
}

export const UserDietsDetail = () => {
    const auth = useAuth();
    const user_id = auth.getUserId();
    const navigate = useNavigate();
    const { type } = useParams();

    const [selectedType, setSelectedType] = useState<string | null>(type !== '0' ? type! : null);
    const [loading, setLoading] = useState(type === '0');
    const [error, setError] = useState<string | null>(null);
    const [success, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if (type === '0') {
            fetch(`http://localhost:8000/api/user-health-data/${user_id}/last`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return response.json();
                })
                .then((data: UserHealthDataEntry) => {
                    const { weight, height } = data;

                    if (weight > height) setSelectedType('1');
                    else if (weight === height) setSelectedType('2');
                    else if (weight < height) setSelectedType('3');
                    else setSelectedType('4');

                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setError('Error al obtener los datos del usuario.');
                    setLoading(false);
                });
        }
    }, [type, user_id]);

    const handleAddDiet = async () => {
        if (!diet) return;

        const dietDataToSend: DietForm = {
            name: diet.name,
            description: diet.description,
            meals: diet.meals.map(meal => ({
                food_name: meal.food_name,
                food_category: meal.food_category,
                day_of_week: meal.day_of_week,
                time_of_day: meal.time_of_day,
                calories: meal.calories
            })),
        };

        try {
            const response = await fetch(`http://localhost:8000/api/users/${user_id}/diets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dietDataToSend),
            });

            if (response.ok) {
                setShowSuccessModal(true);
                alert('✅ Dieta añadida exitosamente');
            } else {
                const errorData = await response.json();
                console.error('Error creating diet:', errorData);
                alert(`Error al crear la dieta: ${errorData.detail || response.statusText}`);
            }
        } catch (error) {
            console.error('Error creating diet:', error);
            alert('Error al crear la dieta. Intente de nuevo más tarde.');
        }
    };

    if (loading) return <div className="p-4 text-center text-gray-500">Cargando datos...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    const diet = diets.find(d => d.id === selectedType);
    if (!diet) return <div className="p-4 text-center text-red-500">Dieta no encontrada.</div>;

    const getBannerColorClasses = () => {
        const colors = categoryColors[selectedType ?? ''];
        if (colors) {
            return `${colors.colorFrom} ${colors.colorTo}`;
        }
        return 'from-emerald-500 to-lime-400';
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
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
            <div className={`flex justify-between items-center bg-gradient-to-r ${getBannerColorClasses()} text-white p-6 rounded-xl shadow-md mb-6`}>

                <div>
                    <h1 className="text-4xl font-extrabold">{diet.name}</h1>
                    <p className="text-lg mt-2">{diet.description}</p>
                </div>
                <button
                    onClick={handleAddDiet}
                    className="bg-white text-emerald-600 hover:text-white hover:bg-emerald-700 font-bold py-2 px-4 rounded-xl shadow transition duration-200"
                >
                    Añadir
                </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">🍽️ Comidas</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {diet.meals.map((meal, index) => (
                    // version vieja
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
                    >
                        <h3
                            className={`w-full text-xl font-bold text-white rounded-t-2xl bg-gradient-to-r ${getBannerColorClasses()} px-5 py-3 h-20 flex items-center`}
                            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                            title={meal.food_name}
                        >
                            {meal.food_name}
                        </h3>
                        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                            {/* Columna izquierda: info */}
                            <div className="md:col-span-2">
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Categoría:</span> {meal.food_category}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Día:</span> {meal.day_of_week}
                                </p>
                                <p className="text-gray-600 mb-1">
                                    <span className="font-medium">Horario:</span> {meal.time_of_day}
                                </p>
                                <p className="text-gray-700 font-semibold">🔥 {meal.calories} calorías</p>
                            </div>

                            {/* Columna derecha: imagen */}
                            <div className="flex justify-center">
                                <img
                                    src={meal.image_url || '/images/placeholder-food.jpg'}
                                    alt={meal.food_name}
                                    className="w-full h-32 object-cover rounded-xl shadow-md"
                                />
                            </div>
                        </div>

                    </div>

                ))}
            </div>
        </div>
    );
};
