import { useState, useEffect } from 'react';
import { UserSleepRecordCreateForm } from '../Forms/UserSleepRecordCreateForm';
import Loading from '../Loading';
import { useAuth } from '../../auth/AuthProvider';

interface Props {
    updateUserSleepRecords: boolean;
    onUpdateUserSleepRecords: (value: boolean) => void;
}

type UserSleepRecordEntry = {
    hours_slept: number;
    date: string;
};

export const UserSleepRecordsList = ({ updateUserSleepRecords, onUpdateUserSleepRecords }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const [userSleepRecords, setUserSleepRecords] = useState<UserSleepRecordEntry[]>([])
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchData = () => {
        fetch(`http://localhost:8000/api/user-sleep-record/${user_id}`, {
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
                    setUserSleepRecords(normalizedData);
                } else if (response.status === 404) {
                    setUserSleepRecords([]); // No hay objetivos
                } else {
                    console.error('Error al obtener los objetivos:', response.statusText);
                }
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        if (updateUserSleepRecords) {
            fetchData();
            onUpdateUserSleepRecords(false);
        }
    }, [updateUserSleepRecords]);

    const handleNewUserSleepRecord = () => {
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
                <span>Historial de Sueño</span>
                <button onClick={() => setOpen(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Registrar sueño
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
                        {userSleepRecords.length === 0 && !loading ? (
                            <div className="text-lg text-slate-400 text-center mt-3">Aún no tenés horas de sueñp cargadas.</div>
                        ) : (
                            <div className="flex-grow overflow-auto">
                                <div className="grid grid-rows-* gap-4 p-2 ml-2 mr-2">
                                    {<table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                                        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                            <tr>
                                                <th className="px-4 py-3 text-left">Fecha</th>
                                                <th className="px-4 py-3 text-left">Horas dormidas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm divide-y divide-gray-200">
                                            {userSleepRecords.map((userSleepRecord) => (
                                                <tr key={1} className="hover:bg-gray-50 transition">
                                                    <td className="px-4 py-2">{userSleepRecord.date}</td>
                                                    <td className="px-4 py-2">{userSleepRecord.hours_slept}</td>
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

            {open && <UserSleepRecordCreateForm setOpenForm={setOpen} onNewUserSleepRecord={handleNewUserSleepRecord}></UserSleepRecordCreateForm>}
        </div>
    );
};