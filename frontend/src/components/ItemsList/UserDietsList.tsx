import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import Loading from '../Loading';
import { DietCreateForm } from '../Forms/DietCreateForm';
import { DietEditForm } from '../Forms/DietEditForm';

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


export const UserDietsList = ({ updateUserDiets}: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const [userDiets, setUserDiets] = useState<DietResponse[]>([]);
    const [selectedDiet, setSelectedDiet] = useState<DietResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [dietToEditId, setDietToEditId] = useState<number | null>(null);

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

    const handleDeleteDiet = async (dietId: number) => {
        if (!user_id) {
            alert('ID de usuario no disponible. Por favor, inicie sesión.');
            return;
        }

        if (window.confirm('¿Estás seguro de que quieres eliminar esta dieta?')) {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`http://localhost:8000/api/users/${user_id}/diets/${dietId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    if (response.status !== 204) {
                        const errorData = await response.json();
                        throw new Error(errorData.detail || 'Error al eliminar la dieta.');
                    }
                }

                alert('Dieta eliminada con éxito.');
                setSelectedDiet(null);
                fetchUserDiets();
            } catch (err: any) {
                console.error('Error deleting diet:', err);
                setError(err.message || 'No se pudo eliminar la dieta.');
            } finally {
                setLoading(false);
            }
        }
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

    const handleDietFormSuccess = () => {
        setOpenCreateForm(false);
        setOpenEditForm(false);
        setDietToEditId(null);
        fetchUserDiets();
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
                <button onClick={() => setOpenCreateForm(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Crear dieta
                </button>
            </div>
            <div className="border-t border-gray-300 my-4"></div>

            {!selectedDiet ? (
                <>
                    {userDiets.length === 0 && !loading ? (
                        <div className="text-lg text-slate-400 text-center mt-3">Aún no tenés dietas cargadas.</div>
                    ) : (
                        <div className="flex-grow overflow-auto">
                            <div className="grid grid-rows-* gap-4 p-2 ml-2 mr-2">
                                <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                                    <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                        <tr>
                                            <th className="px-4 py-3 text-left">Nombre de la Dieta</th>
                                            <th className="px-4 py-3 text-left">Descripción</th>
                                            <th className="px-4 py-3 text-center">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-gray-200">
                                        {userDiets.map((diet) => (
                                            <tr key={diet.id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-2 cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => fetchDietDetails(diet.id)}>
                                                    {diet.name}
                                                </td>
                                                <td className="px-4 py-2">{diet.description || 'N/A'}</td>
                                                <td className="px-4 py-2 text-center">
                                                    <button
                                                        onClick={() => handleEditDiet(diet.id)}
                                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteDiet(diet.id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs"
                                                    >
                                                        Eliminar
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
                <div className="flex-grow overflow-auto p-2 ml-2 mr-2 bg-white border rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4"> {/* botón de volver y los de acción */}
                        <button onClick={handleBackToList} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded focus:outline-none">
                            ← Volver a la lista
                        </button>
                        <div className="flex gap-2"> {/* botones de Editar y Eliminar */}
                            <button
                                onClick={() => handleEditDiet(selectedDiet.id)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDeleteDiet(selectedDiet.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{selectedDiet.name}</h3>
                    {selectedDiet.description && <p className="text-slate-600 mb-4">{selectedDiet.description}</p>}

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                            <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                <tr>
                                    <th className="px-4 py-3 text-left min-w-[80px]">Hora</th>
                                    {orderedDays.map(day => (
                                        <th key={day} className="px-4 py-3 text-left min-w-[150px]">{dayDisplayNames[day]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-200">
                                {getUniqueTimes(getMealSchedule(selectedDiet.meals)).map(time => (
                                    <tr key={time} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-2 font-semibold">{time}</td>
                                        {orderedDays.map(day => (
                                            <td key={`${day}-${time}`} className="px-4 py-2">
                                                {getMealSchedule(selectedDiet.meals)[day]?.[time]?.map((meal, idx) => (
                                                    <div key={idx} className="mb-1 last:mb-0 p-1 border-b border-gray-100 last:border-b-0">
                                                        <strong className="text-slate-700">{meal.food_name}</strong>
                                                        <br />
                                                        <span className="text-gray-500">({meal.calories} kcal)</span>
                                                    </div>
                                                ))}
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

            {/* crear y editar dietas */}
            {openCreateForm && <DietCreateForm setOpenForm={setOpenCreateForm} onNewDiet={handleDietFormSuccess} />}
            {openEditForm && dietToEditId && <DietEditForm dietId={dietToEditId} setOpenForm={setOpenEditForm} onUpdateDiet={handleDietFormSuccess} />}
        </div>
    );
};
