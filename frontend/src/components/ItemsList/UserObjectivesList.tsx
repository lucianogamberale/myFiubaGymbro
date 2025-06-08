import { useState, useEffect } from 'react';
import { UserObjectiveCreateForm } from '../Forms/UserObjectiveCreateForm';
import { UserObjectiveDeleteForm } from '../Forms/UserObjectiveDeleteForm';
import Loading from '../Loading';
import { useAuth } from '../../auth/AuthProvider';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { UserObjectiveEditForm } from '../Forms/UserObjectiveEditForm';

interface Props {
    updateUserObjectives: boolean;
    onUpdateUserObjectives: (value: boolean) => void;
}

export type UserObjectiveEntry = {
    id: number;
    activity: string;
    current_progress: number;
    objective: number;
    unit_of_measurement: string;
    start_date: string;
    end_date: string;
};

export const UserObjectivesList = ({ updateUserObjectives, onUpdateUserObjectives }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const [userObjectives, setUserObjectives] = useState<UserObjectiveEntry[]>([])
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedObjective, setSelectedObjective] = useState<UserObjectiveEntry | null>(null);
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
                <button onClick={() => setOpenCreateForm(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Nuevo Objetivo
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
                                    <div className="space-y-4">
                                        {userObjectives.map((userObjective) => {
                                            const progress = (userObjective.current_progress / userObjective.objective) * 100;
                                            const startDate = new Date(userObjective.start_date);
                                            const endDate = new Date(userObjective.end_date);
                                            const today = new Date();
                                            
                                            // Calculate time progress
                                            const totalDuration = endDate.getTime() - startDate.getTime();
                                            const elapsedTime = today.getTime() - startDate.getTime();
                                            const timeProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
                                            
                                            // Format dates
                                            const formattedStartDate = startDate.toLocaleDateString('es-AR');
                                            const formattedEndDate = endDate.toLocaleDateString('es-AR');
                                            const formattedToday = today.toLocaleDateString('es-AR');
                                            
                                            return (
                                                <div key={1} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                                    <div className="p-5">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h3 className="text-lg font-semibold text-gray-800">
                                                                {userObjective.activity}
                                                            </h3>
                                                            <div className="flex space-x-2">
                                                                <button 
                                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                                    aria-label="Editar objetivo"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setSelectedObjective(userObjective);
                                                                        setOpenEdit(true);
                                                                    }}
                                                                >
                                                                    <FaEdit size={16} />
                                                                </button>
                                                                <button 
                                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                                    aria-label="Eliminar objetivo"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setSelectedObjective(userObjective);
                                                                        setOpenDelete(true);
                                                                    }}
                                                                >
                                                                    <FaTrash size={16} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mb-4">
                                                            <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                                                                <span>Progreso: {userObjective.current_progress} / {userObjective.objective} {userObjective.unit_of_measurement}</span>
                                                                <span className="font-medium">{Math.min(progress, 100).toFixed(1)}%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                                                                <div 
                                                                    className="bg-blue-600 h-2.5 rounded-full" 
                                                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                                                ></div>
                                                            </div>
                                                            
                                                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                                <span>Inicio: {formattedStartDate}</span>
                                                                <span>Hoy: {formattedToday}</span>
                                                                <span>Fin: {formattedEndDate}</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                                <div 
                                                                    className="bg-green-500 h-2.5 rounded-full" 
                                                                    style={{ width: `${Math.max(0, Math.min(timeProgress, 100))}%` }}
                                                                ></div>
                                                            </div>
                                                            <div className="text-right text-xs text-gray-400 mt-1">
                                                                {timeProgress > 0 
                                                                    ? `Tiempo transcurrido: ${timeProgress.toFixed(1)}%` 
                                                                    : 'El objetivo aún no ha comenzado'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
            }

            {openCreateForm && 
            (<UserObjectiveCreateForm 
                setOpenForm={setOpenCreateForm} 
                onNewUserObjective={handleNewUserObjective} 
            />)}
            {selectedObjective && openDelete && (
                <UserObjectiveDeleteForm 
                    open={openDelete} 
                    onClose={() => {
                        setOpenDelete(false);
                        setSelectedObjective(null);
                    }} 
                    user_id={user_id}
                    userObjective={selectedObjective}
                    onUserObjectiveDeleted={fetchData}
                />
            )}
            {selectedObjective && openEdit && (
                <UserObjectiveEditForm 
                    setOpenForm={setOpenEdit}
                    userObjective={selectedObjective}
                    onUserObjectiveEdited={fetchData}
                />
            )}
        </div>
    );
};