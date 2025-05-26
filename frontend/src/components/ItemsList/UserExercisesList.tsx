import { useState, useEffect } from 'react';
import { UserExerciseCreateForm } from '../Forms/UserExerciseCreateForm';
import Loading from '../Loading';
import { useAuth } from '../../auth/AuthProvider';

interface Props {
    updateUserExercises: boolean;
    onUpdateUserExercises: (value: boolean) => void;
}

type UserExerciseEntry = {
    id: number;
    exercise_category: string;
    exercise_name: string;
    calories: number;
    date: string;
    duration: string;
};

export const UserExercisesList = ({ updateUserExercises, onUpdateUserExercises }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const [userExercises, setUserExersises] = useState<UserExerciseEntry[]>([])
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        fetch(`http://localhost:8000/api/user-exercises/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserExersises(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        if (updateUserExercises) {
            fetchData();
            onUpdateUserExercises(false);
        }
    }, [updateUserExercises]);

    const handleNewUserFood = () => {
        fetchData();
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    return (
        <div className="h-full flex flex-col overflow-ayto">
            <div className="border-t border-gray-300 my-3"></div>
            <div className="text-3xl text-slate-900 ml-3 font-bold flex justify-between items-center">
                <span>Mis Ejercicios</span>
                <button onClick={() => setOpen(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Cargar ejercicio
                </button>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            {
                loading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loading />
                    </div>
                ) :
                    <>
                        {userExercises.length === 0 && !loading ? (
                            <div className="text-lg text-slate-400 text-center mt-3">Aún no cargaste nada.</div>
                        ) : (
                            <div className="flex-grow overflow-auto">
                                <div className="grid grid-rows-* gap-4 p-2 ml-2 mr-2">
                                    {<table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                                        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                            <tr>
                                                <th className="px-4 py-3 text-left">Categoría</th>
                                                <th className="px-4 py-3 text-left">Nombre</th>
                                                <th className="">Duración [min]</th>
                                                <th className="px-4 py-3 text-right">Calorías quemadas [cal]</th>
                                                <th className="px-4 py-3 text-left">Fecha y hora</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-gray-200">
                                            {userExercises.map((userExercise) => (
                                                <tr key={userExercise.id} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-2">{userExercise.exercise_category}</td>
                                                    <td className="px-4 py-2">{userExercise.exercise_name}</td>
                                                    <td className="px-4 py-2 text-right">{userExercise.duration}</td>
                                                    <td className="px-4 py-2 text-right">{userExercise.calories}</td>
                                                    <td className="px-4 py-2">
                                                        {new Date(userExercise.date).toLocaleString('es-AR', {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    }
                                </div>
                            </div>
                        )}
                    </>
            }

            {open && <UserExerciseCreateForm setOpenForm={setOpen} onNewUserExercise={handleNewUserFood}></UserExerciseCreateForm>}
        </div>
    );
};