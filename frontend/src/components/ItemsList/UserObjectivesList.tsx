import { useState, useEffect } from 'react';
import { UserObjectiveCreateForm } from '../Forms/UserObjectiveCreateForm';
import Loading from '../Loading';
import { useAuth } from '../../auth/AuthProvider';

interface Props {
    updateUserObjectives: boolean;
    onUpdateUserObjectives: (value: boolean) => void;
}

type UserObjectiveEntry = {
    activity: string;
    objective: number;
    unit_of_measurement: string;
};

export const UserObjectivesList = ({ updateUserObjectives, onUpdateUserObjectives }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const [userObjectives, setUserObjectives] = useState<UserObjectiveEntry[]>([])
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        fetch(`http://localhost:8000/api/user-objectives/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async response => {
                if (response.ok) {
                    const data = await response.json();
                    // Asegurarse que siempre sea un array
                    const normalizedData = Array.isArray(data) ? data : [data];
                    setUserObjectives(normalizedData);
                } else if (response.status === 404) {
                    setUserObjectives([]); // No hay objetivos
                } else {
                    console.error('Error al obtener los objetivos:', response.statusText);
                }
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        if (updateUserObjectives) {
            fetchData();
            onUpdateUserObjectives(false);
        }
    }, [updateUserObjectives]);

    const handleNewUserObjective = () => {
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
                <span>Mis Objetivos</span>
                <button onClick={() => setOpen(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Cargar Objetivo
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
                        {userObjectives.length === 0 && !loading ? (
                            <div className="text-lg text-slate-400 text-center mt-3">Aún no tenés objetivos cargados.</div>
                        ) : (
                            <div className="flex-grow overflow-auto">
                                <div className="grid grid-rows-* gap-4 p-2 ml-2 mr-2">
                                    {<table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                                        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                            <tr>
                                                <th className="px-4 py-3 text-left">Actividad</th>
                                                <th className="px-4 py-3 text-left">Objetivo</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-gray-200">
                                            {userObjectives.map((userObjective) => (
                                                <tr key={1} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-2">{userObjective.activity}</td>
                                                    <td className="px-4 py-2">{userObjective.objective} {userObjective.unit_of_measurement}</td>
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

            {open && <UserObjectiveCreateForm setOpenForm={setOpen} onNewUserObjective={handleNewUserObjective}></UserObjectiveCreateForm>}
        </div>
    );
};