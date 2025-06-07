import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { useParams } from 'react-router-dom';
import { routines } from '../../utils/constants/exercises';

export type UserHealthDataEntry = {
    id: number;
    weight: number;
    height: number;
    date: string;
};

interface ExerciseEntryForm {
    exercise_name: string;
    exercise_category: string;
    day_of_week: string;
    time_of_day: string;
    calories_burned: number;
    duration: number
}

interface RoutineForm {
    name: string;
    description?: string;
    exercises: ExerciseEntryForm[];
}

export const UserExerciseDetailList = () => {
    const auth = useAuth();
    const user_id = auth.getUserId();
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

    const handleAddRoutine = async () => {
        if (!routine) return;

        const routineDataToSend: RoutineForm = {
            name: routine.name,
            description: routine.description,
            exercises: routine.exercises.map(exercise => ({
                exercise_name: exercise.exercise_name,
                exercise_category: exercise.exercise_category,
                day_of_week: exercise.day_of_week,
                time_of_day: exercise.time_of_day,
                calories_burned: exercise.calories_burned,
                duration: exercise.duration
            })),
        };

        try {
            const response = await fetch(`http://localhost:8000/api/users/${user_id}/routines`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(routineDataToSend),
            });

            if (response.ok) {
                setShowSuccessModal(true);
                alert('✅ Rutina añadida exitosamente');
            } else {
                const errorData = await response.json();
                console.error('Error creating routine:', errorData);
                alert(`Error al crear la rutina: ${errorData.detail || response.statusText}`);
            }
        } catch (error) {
            console.error('Error creating routine:', error);
            alert('Error al crear la rutina. Intente de nuevo más tarde.');
        }
    };

    if (loading) return <div className="p-4 text-center text-gray-500">Cargando datos...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    const routine = routines.find(r => r.id === selectedType);
    if (!routine) return <div className="p-4 text-center text-red-500">Rutina no encontrada.</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center bg-gradient-to-r from-emerald-500 to-lime-400 text-white p-6 rounded-xl shadow-md mb-6">
                <div>
                    <h1 className="text-4xl font-extrabold">{routine.name}</h1>
                    <p className="text-lg mt-2">{routine.description}</p>
                </div>
                <button
                    onClick={handleAddRoutine}
                    className="bg-white text-emerald-600 hover:text-white hover:bg-emerald-700 font-bold py-2 px-4 rounded-xl shadow transition duration-200"
                >
                    Añadir
                </button>
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ejercicios</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {routine.exercises.map((exercise, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl p-5 shadow hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-xl font-bold text-emerald-700 mb-1">{exercise.exercise_name}</h3>
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Categoría:</span> {exercise.exercise_category}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Día:</span> {exercise.day_of_week}
                        </p>
                        <p className="text-gray-600 mb-1">
                            <span className="font-medium">Horario:</span>{" "}
                            {exercise.time_of_day}
                        </p>
                        <p className="text-gray-700 font-semibold">🔥 {exercise.calories_burned} calorías</p>
                        <p className="text-gray-700 font-semibold">{exercise.duration} duración</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
