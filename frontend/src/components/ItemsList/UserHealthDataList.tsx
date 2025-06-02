import { useState, useEffect } from 'react';
import { UserHealthDataCreateForm } from '../Forms/UserHealthDataCreateForm';
import { WeightChart } from '../Charts/WeightChart';
import { useAuth } from '../../auth/AuthProvider';
import Loading from '../Loading';


interface Props {
    updateUserHealthData: boolean;
    onUpdateUserHealthData: (value: boolean) => void;
}

export type UserHealthDataEntry = {
    id: number;
    weight: number;
    height: number;
    date: string;
};

export const UserHealthDataList = ({ updateUserHealthData, onUpdateUserHealthData }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const [historicalUserHealthData, setHistoricalUserHealthData] = useState<UserHealthDataEntry[]>([])
    const [lastUserHealthData, setLastUserHealthData] = useState<UserHealthDataEntry | null>(null);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        fetch(`http://localhost:8000/api/user-health-data/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                data.sort((a: UserHealthDataEntry, b: UserHealthDataEntry) => {
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB.getTime() - dateA.getTime();
                });
                setHistoricalUserHealthData(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));

        fetch(`http://localhost:8000/api/user-health-data/${user_id}/last`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json()
            })
            .then(data => {
                setLastUserHealthData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error)
                setLastUserHealthData(null);
            });
    };

    useEffect(() => {
        if (updateUserHealthData) {
            fetchData();
            onUpdateUserHealthData(false);
        }
    }, [updateUserHealthData]);

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
                <span>Mi Salud</span>
                <button onClick={() => setOpen(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Cargar datos de salud
                </button>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            {lastUserHealthData && (
                <div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold ml-2 pl-2">Mis datos de salud</h2>
                    </div>
                    <div className="flex flex-col gap-4 p-4">
                        <div className="bg-gray-100 text-gray-700 shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-300 transform">
                            <div className="text-lg font-semibold">Peso: </div>
                            <div className="text-gray-700 pb-2">{lastUserHealthData.weight} kg</div>
                            <div className="text-lg font-semibold">Altura: </div>
                            <div className="text-gray-700">{lastUserHealthData.height} cm</div>
                        </div>
                    </div>

                    {historicalUserHealthData.length > 0 && (
                        <WeightChart data={historicalUserHealthData} />
                    )}
                </div>
            )}
            {
                loading ? (
                    <div className="flex justify-center items-center h-full">
                        <Loading />
                    </div>
                ) :
                    <>
                        {historicalUserHealthData.length === 0 && !loading ? (
                            <div className="text-lg text-slate-400 text-center mt-3">Aún no cargaste nada.</div>
                        ) : (
                            <div>
                                <div className="border-t border-gray-300 my-4"></div>
                                <div className="flex-grow overflow-auto">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold ml-2 pl-2">Historial de datos de salud</h2>
                                    </div>
                                    <div className="grid grid-rows-* gap-4 px-2 ml-2 mr-2">
                                        {<table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                                            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                                <tr>
                                                    <th className="px-4 py-3 text-left">Fecha</th>
                                                    <th className="px-4 py-3 text-right">Altura [cm]</th>
                                                    <th className="px-4 py-3 text-right">Peso [kg]</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-gray-200">
                                                {historicalUserHealthData.map((userHealthData) => (
                                                    <tr key={userHealthData.id} className="hover:bg-gray-50 transition">
                                                        <td className="px-4 py-2">
                                                            {new Date(userHealthData.date).toLocaleString('es-AR', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric',
                                                            })}
                                                        </td>
                                                        <td className="px-4 py-2 text-right">{userHealthData.height}</td>
                                                        <td className="px-4 py-2 text-right">{userHealthData.weight}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                        }
                    </>
            }

            {open && <UserHealthDataCreateForm setOpenForm={setOpen} onNewUserHealthData={handleNewUserFood}></UserHealthDataCreateForm>}
        </div >
    );
};