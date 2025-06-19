import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import Loading from '../Loading';
import { DietCreateForm } from '../Forms/DietCreateForm';
import { DietEditForm } from '../Forms/DietEditForm';
import { ModalConfirm } from '../ModalConfirm';
import { ModalSuccess } from '../ModalSuccess';

interface Props {
    updateUserDiets: boolean;
    onUpdateUserDiets: (value: boolean) => void;
}

type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

interface DietMealEntryResponse {
    id: number;
    day_of_week: DayOfWeek;
    time_of_day: string;
    food_name: string;
    food_category: string;
    calories: number;
}

interface DietResponse {
    id: number;
    name: string;
    description?: string;
    user_id: number;
    meals: DietMealEntryResponse[];
}

type MealSchedule = {
    [day: string]: {
        [time: string]: DietMealEntryResponse[];
    };
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


export const UserDietsList = ({ updateUserDiets, onUpdateUserDiets }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const [userDiets, setUserDiets] = useState<DietResponse[]>([]);
    const [selectedDiet, setSelectedDiet] = useState<DietResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [dietToEditId, setDietToEditId] = useState<number | null>(null);

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [dietToDeleteId, setDietToDeleteId] = useState<number | null>(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

    const fetchUserDiets = async () => {
        if (!user_id) {
            setError('ID de usuario no disponible. Por favor, inicie sesión.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user_id}/diets`);
            if (!response.ok) throw new Error('Error al obtener la lista de dietas.');
            const data: DietResponse[] = await response.json();
            setUserDiets(data);
        } catch (err: any) {
            console.error('Error fetching user diets:', err);
            setError(err.message || 'No se pudieron cargar las dietas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user_id) {
            fetchUserDiets();
        }
    }, [user_id, updateUserDiets]);

    const fetchDietDetails = async (dietId: number) => {
        if (!user_id) {
            setError('ID de usuario no disponible.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user_id}/diets/${dietId}`);
            if (!response.ok) throw new Error('Error al obtener los detalles de la dieta.');
            const data: DietResponse = await response.json();
            setSelectedDiet(data);
        } catch (err: any) {
            console.error('Error fetching diet details:', err);
            setError(err.message || 'No se pudo cargar el detalle de la dieta.');
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteDiet = (dietId: number) => {
        setDietToDeleteId(dietId);
        setShowConfirmDeleteModal(true);
    };

    const executeDeleteDiet = async () => {
        if (!user_id || dietToDeleteId === null) {
            alert('ID de usuario o dieta no disponible. Por favor, inicie sesión.');
            return;
        }

        setShowConfirmDeleteModal(false);
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:8000/api/users/${user_id}/diets/${dietToDeleteId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                if (response.status !== 204) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Error al eliminar la dieta.');
                }
            }

            setSelectedDiet(null);
            onUpdateUserDiets(!updateUserDiets);
        } catch (err: any) {
            console.error('Error deleting diet:', err);
            setError(err.message || 'No se pudo eliminar la dieta.');
        } finally {
            setLoading(false);
            setDietToDeleteId(null);
        }
    };

    const cancelDeleteDiet = () => {
        setShowConfirmDeleteModal(false);
        setDietToDeleteId(null);
    };

    const handleEditDiet = (dietId: number) => {
        setDietToEditId(dietId);
        setOpenEditForm(true);
    };

    const handleBackToList = () => {
        setSelectedDiet(null);
        setError('');
    };

    const getMealSchedule = (meals: DietMealEntryResponse[]): MealSchedule => {
        const schedule: MealSchedule = {};
        meals.forEach(meal => {
            const day = meal.day_of_week;
            const time = meal.time_of_day.substring(0, 5);

            if (!schedule[day]) {
                schedule[day] = {};
            }
            if (!schedule[day][time]) {
                schedule[day][time] = [];
            }
            schedule[day][time].push(meal);
        });
        return schedule;
    };

    const getUniqueTimes = (schedule: MealSchedule): string[] => {
        const allTimes = new Set<string>();
        orderedDays.forEach(day => {
            if (schedule[day]) {
                Object.keys(schedule[day]).forEach(time => allTimes.add(time));
            }
        });
        return Array.from(allTimes).sort((a, b) => {
            const [ha, ma] = a.split(':').map(Number);
            const [hb, mb] = b.split(':').map(Number);
            if (ha !== hb) return ha - hb;
            return ma - mb;
        });
    };

    const handleDietFormSuccess = (isEdit: boolean) => {
        setOpenCreateForm(false);
        setOpenEditForm(false);
        setDietToEditId(null);

        if (isEdit) {
            setSuccessMessage({ title: '¡Editada con éxito!', description: 'La dieta ha sido editada con éxito.' });
        } else {
            setSuccessMessage({ title: '¡Creada con éxito!', description: 'La dieta ha sido creada con éxito.' });
        }
        setShowSuccessModal(true);

        if (selectedDiet) {
            fetchDietDetails(selectedDiet.id);
        } else {
            onUpdateUserDiets(!updateUserDiets);
        }
    };

    const handleCloseAll = () => {
        setShowSuccessModal(false);
        onUpdateUserDiets(!updateUserDiets);
    };

    const handleMarkMealAsConsumed = async (meal: DietMealEntryResponse) => {
        if (!user_id) {
            setError('ID de usuario no disponible. Por favor, inicie sesión.');
            return;
        }

        try {
            const now = new Date();
            const argentinaTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/Argentina/Buenos_Aires' }));
            argentinaTime.setHours(argentinaTime.getHours() - 3);

            const userMealData = {
                food_name: meal.food_name,
                food_category: meal.food_category,
                calories: meal.calories,
                date: argentinaTime.toISOString()
            };

            const response = await fetch(`http://localhost:8000/api/user-foods/${user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userMealData),
            });

            if (!response.ok) {
                throw new Error('Error al marcar la comida como consumida.');
            }

            setSuccessMessage({
                title: '¡Comida consumida!',
                description: 'La comida ha sido marcada como consumida y agregada a tus comidas realizadas.'
            });
            setShowSuccessModal(true);
        } catch (err: any) {
            console.error('Error marking meal as consumed:', err);
            setError(err.message || 'No se pudo marcar la comida como consumida.');
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
                <span>Mis Dietas</span>
                <button onClick={() => setOpenCreateForm(true)} className="text-lg bg-slate-800 hover:bg-slate-600 py-1 px-5 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Crear dieta
                </button>
            </div>
            <div className="border-t border-gray-300 my-4"></div>

            {!selectedDiet ? (
                <>
                    {userDiets.length === 0 && !loading ? (
                        <div className="text-lg text-slate-400 text-center mt-3">Aún no cargaste nada.</div>
                    ) : (
                        <div className="flex-grow overflow-auto">
                            <div className="grid grid-rows-* gap-4 p-2 ml-2 mr-2">
                                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                                    <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Nombre de la Dieta</th>
                                            <th className="px-4 py-3 text-left">Descripción</th>
                                            <th className="px-4 py-3 text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-200">
                                        {userDiets.map((diet) => (
                                            <tr key={diet.id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-2 cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => fetchDietDetails(diet.id)}>
                                                    {diet.name}
                                                </td>
                                                <td className="px-4 py-2">{diet.description || 'N/A'}</td>
                                                <td className="px-4 py-2 text-right">
                                                    <button
                                                        onClick={() => handleEditDiet(diet.id)}
                                                        className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => confirmDeleteDiet(diet.id)}
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
                                onClick={() => handleEditDiet(selectedDiet.id)}
                                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => confirmDeleteDiet(selectedDiet.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                Borrar
                            </button>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Dieta: {selectedDiet.name}</h3>
                    {selectedDiet.description && <p className="text-slate-600 mb-4">Descripción: {selectedDiet.description}</p>}

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-fixed divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                <tr>
                                    <th className="w-[100px] px-4 py-3 text-center">Hora</th>
                                    {orderedDays.map(day => (
                                        <th key={day} className="w-[150px] px-4 py-3 text-center">
                                            {dayDisplayNames[day]}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-200">
                                {getUniqueTimes(getMealSchedule(selectedDiet.meals)).map(time => (
                                    <tr key={time} className="hover:bg-gray-50 transition">
                                        <td className="w-[100px] h-[100px] px-4 py-2 text-center font-semibold align-middle">
                                            {time}
                                        </td>
                                        {orderedDays.map(day => (
                                            <td key={`${day}-${time}`} className="w-[150px] h-[120px] px-1 py-2 align-top text-center">
                                                <div className="h-full w-full flex flex-col justify-center items-center">
                                                    {(getMealSchedule(selectedDiet.meals)[day]?.[time] || []).map((meal, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="w-full h-full flex flex-col justify-between bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-300"
                                                        >
                                                            <div className="flex-1 overflow-hidden text-ellipsis">
                                                                <div className="text-slate-700 text-center text-sm break-words leading-tight">
                                                                    {meal.food_name}
                                                                </div>
                                                                <div className="text-gray-500 text-center text-xs mt-1">
                                                                    ({meal.calories} cal)
                                                                </div>
                                                            </div>
                                                            <div className="mt-1">
                                                                <button
                                                                    onClick={() => handleMarkMealAsConsumed(meal)}
                                                                    className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-xs"
                                                                >
                                                                    Consumir
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                        ))}
                                    </tr>
                                ))}
                                {getUniqueTimes(getMealSchedule(selectedDiet.meals)).length === 0 && (
                                    <tr>
                                        <td colSpan={orderedDays.length + 1} className="px-4 py-2 text-center text-slate-400">
                                            No hay comidas registradas para esta dieta.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* crear y editar */}
            {openCreateForm && (
                <DietCreateForm
                    setOpenForm={setOpenCreateForm}
                    onNewDiet={() => handleDietFormSuccess(false)}
                ></DietCreateForm>
            )}
            {openEditForm && dietToEditId && (
                <DietEditForm
                    dietId={dietToEditId}
                    setOpenForm={setOpenEditForm}
                    onUpdateDiet={() => handleDietFormSuccess(true)}
                ></DietEditForm>
            )}

            {/* confirmación de eliminación */}
            {showConfirmDeleteModal && (
                <ModalConfirm
                    title="Confirmar Eliminación"
                    description="¿Estás seguro de que quieres eliminar esta dieta? Esta acción no se puede deshacer."
                    onConfirm={executeDeleteDiet}
                    onCancel={cancelDeleteDiet}
                ></ModalConfirm>
            )}

            {showSuccessModal && (
                <ModalSuccess
                    title={successMessage.title}
                    description={successMessage.description}
                    route="/user-diets"
                    button="Ir a mis dietas"
                    onClose={handleCloseAll}
                ></ModalSuccess>
            )}
        </div>
    );
};