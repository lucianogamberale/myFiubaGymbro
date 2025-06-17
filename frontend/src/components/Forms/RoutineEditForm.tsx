import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { ModalSuccess } from "../ModalSuccess";
import { useAuth } from '../../auth/AuthProvider';
import Loading from '../Loading';
import { exerciseCategories } from '../../utils/constants/exerciseCategories';

interface Props {
    routineId: number;
    setOpenForm: (value: boolean) => void;
    onUpdateRoutine: () => void;
}

type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

interface RoutineExerciseEntryForm {
    day_of_week: DayOfWeek;
    time_of_day: string;
    exercise_name: string;
    exercise_category: string;
    duration: number;
    calories_burned: number;
}

interface RoutineForm {
    name: string;
    description?: string;
    exercises: RoutineExerciseEntryForm[];
}

const daysOfWeek: DayOfWeek[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

const dayDisplayNames: { [key: string]: string } = {
    MONDAY: "Lunes",
    TUESDAY: "Martes",
    WEDNESDAY: "Miércoles",
    THURSDAY: "Jueves",
    FRIDAY: "Viernes",
    SATURDAY: "Sábado",
    SUNDAY: "Domingo",
};

export const RoutineEditForm = ({ routineId, setOpenForm, onUpdateRoutine }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RoutineForm>({
        defaultValues: {
            name: '',
            description: '',
            exercises: [],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'exercises',
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRoutineDetails = async () => {
            if (!user_id || !routineId) {
                setError('ID de usuario o rutina no proporcionado.');
                setLoading(false);
                return;
            }
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`http://localhost:8000/api/users/${user_id}/routines/${routineId}`);
                if (!response.ok) throw new Error('Error al obtener los detalles de la rutina para edición.');
                const data = await response.json();

                reset({
                    name: data.name,
                    description: data.description,
                    exercises: data.exercises.map((exercise: any) => ({
                        day_of_week: exercise.day_of_week,
                        time_of_day: exercise.time_of_day.substring(0, 5), // Format time for input type="time"
                        exercise_name: exercise.exercise_name,
                        exercise_category: exercise.exercise_category,
                        duration: exercise.duration,
                        calories_burned: exercise.calories_burned,
                    })),
                });

            } catch (err: any) {
                console.error('Error fetching routine details for edit:', err);
                setError(err.message || 'No se pudieron cargar los detalles de la rutina para edición.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoutineDetails();
    }, [routineId, user_id, reset]);

    function closeForm() {
        setOpenForm(false);
    }
    function handleCloseAll() {
        setShowSuccessModal(false);
        closeForm();
    }

    const handleAddExercise = () => {
        append({
            day_of_week: "MONDAY",
            time_of_day: "08:00",
            exercise_name: "",
            exercise_category: "",
            duration: 0,
            calories_burned: 0,
        });
    };

    const handleRemoveExercise = (indexToRemove: number) => {
        remove(indexToRemove);
    };

    const onSubmit = async (data: RoutineForm) => {
        if (!user_id || !routineId) {
            alert('ID de usuario o rutina no disponible. Por favor, inicie sesión o seleccione una rutina.');
            return;
        }

        const routineData = {
            name: data.name,
            description: data.description,
            exercises: data.exercises.map(exercise => ({
                day_of_week: exercise.day_of_week,
                time_of_day: exercise.time_of_day + ":00", // Append seconds for backend
                exercise_name: exercise.exercise_name,
                exercise_category: exercise.exercise_category,
                duration: Number(exercise.duration),
                calories_burned: Number(exercise.calories_burned),
            })),
        };

        try {
            const response = await fetch(`http://localhost:8000/api/users/${user_id}/routines/${routineId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(routineData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al actualizar la rutina');
            }

            console.log('Rutina actualizada con éxito.');
            setShowSuccessModal(true);
            onUpdateRoutine();
        } catch (error: any) {
            console.error('Error al actualizar la rutina:', error.message);
            alert(`Error al actualizar la rutina: ${error.message}`);
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 transition-opacity">
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 transition-opacity">
                <div className="bg-white rounded-lg p-8 shadow-lg w-96 h-auto flex flex-col items-center justify-center">
                    <h1 className="text-xl font-semibold text-red-600 mb-4 text-center">Error al cargar rutina</h1>
                    <p className="text-gray-700 mb-4 text-center">{error}</p>
                    <button
                        onClick={closeForm}
                        className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600 focus:outline-none focus:bg-slate-600"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="relative z-60">
                <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-50 w-screen overflow-y-auto flex justify-center items-center p-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg xl:w-2/4 p-10 max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Editar Rutina</h2>

                        <div className="mb-4">
                            <label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="routineName">
                                Nombre de la Rutina:
                            </label>
                            <input
                                type="text"
                                id="routineName"
                                {...register('name', { required: 'El nombre es obligatorio' })}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
                            />
                            {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="routineDescription">
                                Descripción (opcional):
                            </label>
                            <textarea
                                id="routineDescription"
                                {...register('description')}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            ></textarea>
                        </div>

                        <h3 className="text-xl font-bold text-slate-700 mb-4 mt-6">Ejercicios de la Rutina</h3>
                        <div className="routine-exercises-list space-y-4">
                            {fields.map((field, index) => (
                                <div key={field.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                                    <h4 className="text-lg font-semibold text-slate-600 mb-4">Ejercicio #{index + 1}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-1">Día de la semana:</label>
                                            <Controller
                                                name={`exercises.${index}.day_of_week`}
                                                control={control}
                                                defaultValue={field.day_of_week}
                                                rules={{ required: 'El día es obligatorio' }}
                                                render={({ field: controllerField }) => (
                                                    <select {...controllerField} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.exercises?.[index]?.day_of_week ? 'border-red-500' : ''}`}>
                                                        {daysOfWeek.map(day => (
                                                            <option key={day} value={day}>{dayDisplayNames[day]}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            />
                                            {errors.exercises?.[index]?.day_of_week && <p className="text-red-500 text-xs italic">{errors.exercises[index].day_of_week?.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-1">Nombre del Ejercicio:</label>
                                            <input
                                                type="text"
                                                id={`exercises.${index}.exercise_name`}
                                                placeholder="Ej. Flexiones"
                                                {...register(`exercises.${index}.exercise_name`, { required: "El nombre del ejercicio es obligatorio" })}
                                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.exercises?.[index]?.exercise_name ? 'border-red-500' : ''}`}
                                            />
                                            {errors.exercises?.[index]?.exercise_name && <p className="text-red-500 text-xs italic">{errors.exercises[index].exercise_name?.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-1">Categoría del Ejercicio:</label>
                                            <Controller
                                                name={`exercises.${index}.exercise_category`}
                                                control={control}
                                                defaultValue={field.exercise_category}
                                                rules={{ required: 'La categoría es obligatoria' }}
                                                render={({ field: controllerField }) => (
                                                    <select {...controllerField} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.exercises?.[index]?.exercise_category ? 'border-red-500' : ''}`}>
                                                        <option value="">Selecciona una categoría</option>
                                                        {Object.entries(exerciseCategories).map(([key, value]) => (
                                                            <option key={key} value={value}>{value}</option>
                                                        ))}
                                                    </select>
                                                )}
                                            />
                                            {errors.exercises?.[index]?.exercise_category && <p className="text-red-500 text-xs italic">{errors.exercises[index].exercise_category?.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-1">Duración (minutos):</label>
                                            <Controller
                                                name={`exercises.${index}.duration`}
                                                control={control}
                                                defaultValue={field.duration}
                                                rules={{ required: 'La duración es obligatoria', min: { value: 1, message: 'Debe ser al menos 1 minuto' } }}
                                                render={({ field: controllerField }) => (
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        {...controllerField}
                                                        onChange={e => controllerField.onChange(Number(e.target.value))}
                                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.exercises?.[index]?.duration ? 'border-red-500' : ''}`}
                                                    />
                                                )}
                                            />
                                            {errors.exercises?.[index]?.duration && <p className="text-red-500 text-xs italic">{errors.exercises[index].duration?.message}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-1">Calorías Quemadas (cal):</label>
                                            <Controller
                                                name={`exercises.${index}.calories_burned`}
                                                control={control}
                                                defaultValue={field.calories_burned}
                                                rules={{ required: 'Las calorías quemadas son obligatorias', min: { value: 1, message: 'Debe ser al menos 1 caloría' } }}
                                                render={({ field: controllerField }) => (
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        {...controllerField}
                                                        onChange={e => controllerField.onChange(Number(e.target.value))}
                                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.exercises?.[index]?.calories_burned ? 'border-red-500' : ''}`}
                                                    />
                                                )}
                                            />
                                            {errors.exercises?.[index]?.calories_burned && <p className="text-red-500 text-xs italic">{errors.exercises[index].calories_burned?.message}</p>}
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-4">
                                        <button type="button" onClick={() => handleRemoveExercise(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                            Borrar Ejercicio
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-6">
                            <button type="button" onClick={handleAddExercise} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                                Añadir Ejercicio
                            </button>
                        </div>

                        <div className="flex items-center justify-end mt-8">
                            <button onClick={closeForm} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-center font-semibold mr-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Cerrar
                            </button>
                            <button type="submit" className="bg-slate-700 hover:bg-slate-800 text-white text-center font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showSuccessModal &&
                <ModalSuccess
                    title="¡Rutina actualizada con éxito!"
                    description="La rutina ha sido actualizada con éxito."
                    route="/user-routines"
                    button="Ir a mis rutinas"
                    onClose={handleCloseAll}
                />
            }
        </>
    );
};