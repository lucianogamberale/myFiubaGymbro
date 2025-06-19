import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import Loading from '../Loading';
import { RoutineCreateForm } from '../Forms/RoutineCreateForm';
import { RoutineEditForm } from '../Forms/RoutineEditForm';
import { ModalConfirm } from '../ModalConfirm';
import { ModalSuccess } from '../ModalSuccess';

interface Props {
    updateUserRoutines: boolean;
    onUpdateUserRoutines: (value: boolean) => void;
}

type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

interface RoutineExerciseEntryResponse {
    id: number;
    day_of_week: DayOfWeek;
    time_of_day: string;
    exercise_name: string;
    exercise_category: string;
    duration: number;
    calories_burned: number;
}

interface RoutineResponse {
    id: number;
    name: string;
    description?: string;
    user_id: number;
    exercises: RoutineExerciseEntryResponse[];
}

type ExerciseSchedule = {
    [day: string]: RoutineExerciseEntryResponse[];
};

const orderedDays: DayOfWeek[] = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
];

const dayDisplayNames: { [key: string]: string } = {
    MONDAY: "Lunes",
    TUESDAY: "Martes",
    WEDNESDAY: "Miércoles",
    THURSDAY: "Jueves",
    FRIDAY: "Viernes",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
};

export const UserRoutinesList = ({ updateUserRoutines, onUpdateUserRoutines }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const [userRoutines, setUserRoutines] = useState<RoutineResponse[]>([]);
    const [selectedRoutine, setSelectedRoutine] = useState<RoutineResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [routineToEditId, setRoutineToEditId] = useState<number | null>(null);

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [routineToDeleteId, setRoutineToDeleteId] = useState<number | null>(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

    const fetchUserRoutines = async () => {
        if (!user_id) {
            setError('ID de usuario no disponible. Por favor, inicie sesión.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user_id}/routines`);
            if (!response.ok) throw new Error('Error al obtener la lista de rutinas.');
            const data: RoutineResponse[] = await response.json();
            setUserRoutines(data);
        } catch (err: any) {
            console.error('Error fetching user routines:', err);
            setError(err.message || 'No se pudieron cargar las rutinas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user_id) {
            fetchUserRoutines();
        }
    }, [user_id, updateUserRoutines]);

    const fetchRoutineDetails = async (routineId: number) => {
        if (!user_id) {
            setError('ID de usuario no disponible.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user_id}/routines/${routineId}`);
            if (!response.ok) throw new Error('Error al obtener los detalles de la rutina.');
            const data: RoutineResponse = await response.json();
            setSelectedRoutine(data);
        } catch (err: any) {
            console.error('Error fetching routine details:', err);
            setError(err.message || 'No se pudo cargar el detalle de la rutina.');
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteRoutine = (routineId: number) => {
        setRoutineToDeleteId(routineId);
        setShowConfirmDeleteModal(true);
    };

    const executeDeleteRoutine = async () => {
        if (!user_id || routineToDeleteId === null) {
            alert('ID de usuario o rutina no disponible. Por favor, inicie sesión.');
            return;
        }

        setShowConfirmDeleteModal(false);
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user_id}/routines/${routineToDeleteId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                if (response.status !== 204) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Error al eliminar la rutina.');
                }
            }

            setSelectedRoutine(null);
            onUpdateUserRoutines(!updateUserRoutines);
        } catch (err: any) {
            console.error('Error deleting routine:', err);
            setError(err.message || 'No se pudo eliminar la rutina.');
        } finally {
            setLoading(false);
            setRoutineToDeleteId(null);
        }
    };

    const cancelDeleteRoutine = () => {
        setShowConfirmDeleteModal(false);
        setRoutineToDeleteId(null);
    };

    const handleEditRoutine = (routineId: number) => {
        setRoutineToEditId(routineId);
        setOpenEditForm(true);
    };

    const handleBackToList = () => {
        setSelectedRoutine(null);
        setError('');
    };

    const getExerciseSchedule = (exercises: RoutineExerciseEntryResponse[]): ExerciseSchedule => {
        const schedule: ExerciseSchedule = {};
        exercises.forEach(exercise => {
            const day = exercise.day_of_week;
            if (!schedule[day]) {
                schedule[day] = [];
            }
            schedule[day].push(exercise);
        });
        return schedule;
    };

    const handleRoutineFormSuccess = (isEdit: boolean) => {
        setOpenCreateForm(false);
        setOpenEditForm(false);
        setRoutineToEditId(null);

        if (isEdit) {
            setSuccessMessage({ title: '¡Editada con éxito!', description: 'La rutina ha sido editada con éxito.' });
        } else {
            setSuccessMessage({ title: '¡Creada con éxito!', description: 'La rutina ha sido creada con éxito.' });
        }
        setShowSuccessModal(true);

        if (selectedRoutine) {
            fetchRoutineDetails(selectedRoutine.id);
        } else {
            onUpdateUserRoutines(!updateUserRoutines);
        }
    };

    const handleCloseAll = () => {
        setShowSuccessModal(false);
        onUpdateUserRoutines(!updateUserRoutines);
    };

    // Calculate days with exercises only when a routine is selected
    const daysWithExercises: DayOfWeek[] = selectedRoutine
        ? orderedDays.filter(day => getExerciseSchedule(selectedRoutine.exercises)[day]?.length > 0)
        : [];

    const handleMarkExerciseAsCompleted = async (exercise: RoutineExerciseEntryResponse) => {
        if (!user_id) {
            setError('ID de usuario no disponible. Por favor, inicie sesión.');
            return;
        }

        try {
            const now = new Date();
            const argentinaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }));
            argentinaTime.setHours(argentinaTime.getHours() - 3);

            const userExerciseData = {
                exercise_name: exercise.exercise_name,
                exercise_category: exercise.exercise_category,
                duration: exercise.duration,
                calories: exercise.calories_burned,
                date: argentinaTime.toISOString()
            };

            const response = await fetch(`http://localhost:8000/api/user-exercises/${user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userExerciseData),
            });

            if (!response.ok) {
                throw new Error('Error al marcar el ejercicio como completado.');
            }

            setSuccessMessage({
                title: '¡Ejercicio completado!',
                description: 'El ejercicio ha sido marcado como completado y agregado a tus ejercicios realizados.'
            });
            setShowSuccessModal(true);
        } catch (err: any) {
            console.error('Error marking exercise as completed:', err);
            setError(err.message || 'No se pudo marcar el ejercicio como completado.');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-full">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col overflow-auto">
            <div className="border-t border-gray-300 my-3"></div>
            <div className="text-3xl text-slate-900 ml-3 font-bold flex justify-between items-center">
                <span>Mis Rutinas</span>
                <button onClick={() => setOpenCreateForm(true)} className="text-lg bg-slate-800 hover:bg-slate-600 py-1 px-5 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Crear rutina
                </button>
            </div>
            <div className="border-t border-gray-300 my-4"></div>

            {!selectedRoutine ? (
                <>
                    {userRoutines.length === 0 && !loading ? (
                        <div className="text-lg text-slate-400 text-center mt-3">Aún no cargaste nada.</div>
                    ) : (
                        <div className="flex-grow overflow-auto">
                            <div className="grid grid-rows-* gap-4 p-2 ml-2 mr-2">
                                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                                    <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Nombre de la Rutina</th>
                                            <th className="px-4 py-3 text-left">Descripción</th>
                                            <th className="px-4 py-3 text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-200">
                                        {userRoutines.map((routine) => (
                                            <tr key={routine.id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-2 cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => fetchRoutineDetails(routine.id)}>
                                                    {routine.name}
                                                </td>
                                                <td className="px-4 py-2">{routine.description || 'N/A'}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <button
                                                        onClick={() => handleEditRoutine(routine.id)}
                                                        className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => confirmDeleteRoutine(routine.id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs"
                                                    >
                                                        Borrar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex-grow overflow-auto p-4 ml-2 mr-2 bg-white border rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={handleBackToList} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded focus:outline-none">
                            ← Volver a la lista
                        </button>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEditRoutine(selectedRoutine.id)}
                                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => confirmDeleteRoutine(selectedRoutine.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                Borrar
                            </button>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Rutina: {selectedRoutine.name}</h3>
                    {selectedRoutine.description && <p className="text-slate-600 mb-4">Descripción: {selectedRoutine.description}</p>}

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-fixed divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                <tr>
                                    {/* Mapear solo los días que tienen ejercicios */}
                                    {daysWithExercises.map(day => (
                                        <th key={day} className="w-[150px] px-4 py-3 text-center">{dayDisplayNames[day]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-200">
                                <tr className='hover:bg-gray-50 transition'>
                                    {/* Mapear solo los días que tienen ejercicios para las celdas */}
                                    {daysWithExercises.map(day => {
                                        const exercisesForDay = getExerciseSchedule(selectedRoutine.exercises)[day];
                                        return (
                                            <td key={day} className="ww-[150px] h-[120px] px-1 py-2 align-top text-center">
                                                {exercisesForDay && exercisesForDay.length > 0 ? (
                                                    exercisesForDay.map((exercise, idx) => (
                                                        <div key={idx} className="h-full w-full flex flex-col justify-center items-center">
                                                            <div className="w-full h-full flex flex-col justify-between bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-300">
                                                                <div>
                                                                    <div className="flex-1 overflow-hidden text-ellipsis">
                                                                        <div className="text-slate-700 text-center text-sm break-words leading-tight">
                                                                            {exercise.exercise_name}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-1">
                                                                    <div className="text-gray-500 text-center text-xs">
                                                                        ({exercise.duration} min, {exercise.calories_burned} cal)
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleMarkExerciseAsCompleted(exercise)}
                                                                        className="mt-1 w-full bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs"
                                                                    >
                                                                        Completar
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    // This else block should theoretically not be reached if daysWithExercises is filtered correctly
                                                    <span className="text-gray-400">No hay ejercicios.</span>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                                {/* Este mensaje se muestra si selectedRoutine.exercises está completamente vacío */}
                                {selectedRoutine.exercises.length === 0 && (
                                    <tr>
                                        {/* If no exercises, colspan should be 1 to span the single column that would be present if the table had a fixed width, or dynamically adjust */}
                                        <td colSpan={daysWithExercises.length > 0 ? daysWithExercises.length : 1} className="px-4 py-2 text-center text-slate-400">
                                            No hay ejercicios registrados para esta rutina.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* crear y editar rutinas */}
            {openCreateForm && (
                <RoutineCreateForm
                    setOpenForm={setOpenCreateForm}
                    onNewRoutine={() => handleRoutineFormSuccess(false)}
                ></RoutineCreateForm>
            )}
            {openEditForm && routineToEditId && (
                <RoutineEditForm
                    routineId={routineToEditId}
                    setOpenForm={setOpenEditForm}
                    onUpdateRoutine={() => handleRoutineFormSuccess(true)}
                ></RoutineEditForm>
            )}

            {/* confirmación de eliminación */}
            {showConfirmDeleteModal && (
                <ModalConfirm
                    title="Confirmar Eliminación"
                    description="¿Estás seguro de que quieres eliminar esta rutina? Esta acción no se puede deshacer."
                    onConfirm={executeDeleteRoutine}
                    onCancel={cancelDeleteRoutine}
                ></ModalConfirm>
            )}

            {showSuccessModal && (
                <ModalSuccess
                    title={successMessage.title}
                    description={successMessage.description}
                    route="/user-routines"
                    button="Ir a mis rutinas"
                    onClose={handleCloseAll}
                ></ModalSuccess>
            )}
        </div>
    );
};