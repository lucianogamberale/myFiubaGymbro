import { useState } from "react";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { ModalSuccess } from "../ModalSuccess";
import { useAuth } from '../../auth/AuthProvider';
import { exerciseCategories } from '../../utils/constants/exerciseCategories';

interface Props {
    setOpenForm: (value: boolean) => void;
    onNewRoutine: () => void;
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


export const RoutineCreateForm = ({ setOpenForm, onNewRoutine }: Props) => {
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
            name: "",
            description: "",
            exercises: [{ day_of_week: "MONDAY", time_of_day: "08:00", exercise_name: "", exercise_category: "", duration: 0, calories_burned: 0 }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "exercises",
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    function closeForm() {
        setOpenForm(false);
    }

    function handleCloseAll() {
        setShowSuccessModal(false);
        closeForm();
    }

    const handleAddExercise = () => {
        append({ day_of_week: "MONDAY", time_of_day: "08:00", exercise_name: "", exercise_category: "", duration: 0, calories_burned: 0 });
    };

    const handleRemoveExercise = (index: number) => {
        remove(index);
    };


    const onSubmit = async (data: RoutineForm) => {
        if (!user_id) {
            console.error("User ID not found.");
            return;
        }

        const routineDataToSend = {
            ...data,
            exercises: data.exercises.map(exercise => ({
                ...exercise,
                duration: Number(exercise.duration),
                calories_burned: Number(exercise.calories_burned),
                time_of_day: exercise.time_of_day + ':00'
            }))
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
                reset();
                setShowSuccessModal(true);
                onNewRoutine();
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

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-center text-slate-700 mb-6">Crear Nueva Rutina</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="name">
                            Nombre de la Rutina
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Rutina para ganar masa muscular"
                            {...register("name", { required: "El nombre de la rutina es obligatorio" })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="description">
                            Descripción (opcional)
                        </label>
                        <textarea
                            id="description"
                            placeholder="Una rutina balanceada para...."
                            {...register("description")}
                            rows={3}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>

                    <h3 className="text-xl font-bold text-slate-700 mt-8 mb-4 border-b pb-2">Ejercicios de la Rutina</h3>
                    <div className="space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                                <h4 className="text-lg font-semibold text-slate-600 mb-3">Ejercicio #{index + 1}</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`exercises.${index}.day_of_week`}>
                                            Día de la semana
                                        </label>
                                        <Controller
                                            name={`exercises.${index}.day_of_week`}
                                            control={control}
                                            rules={{ required: "El día de la semana es obligatorio" }}
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    id={`exercises.${index}.day_of_week`}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    {daysOfWeek.map((day) => (
                                                        <option key={day} value={day}>
                                                            {dayDisplayNames[day]}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        />
                                        {errors.exercises?.[index]?.day_of_week && <p className="text-red-500 text-xs italic">{errors.exercises[index].day_of_week?.message}</p>}
                                    </div>



                                    <div>
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`exercises.${index}.exercise_name`}>
                                            Nombre del Ejercicio
                                        </label>
                                        <input // Cambiado a input type="text"
                                            id={`exercises.${index}.exercise_name`}
                                            type="text"
                                            placeholder="Ej. Flexiones"
                                            {...register(`exercises.${index}.exercise_name`, { required: "El nombre del ejercicio es obligatorio" })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        />
                                        {errors.exercises?.[index]?.exercise_name && <p className="text-red-500 text-xs italic">{errors.exercises[index].exercise_name?.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`exercises.${index}.exercise_category`}>
                                            Categoría del Ejercicio
                                        </label>
                                        <Controller
                                            name={`exercises.${index}.exercise_category`}
                                            control={control}
                                            rules={{ required: "La categoría del ejercicio es obligatoria" }}
                                            render={({ field }) => (
                                                <select
                                                    {...field}
                                                    id={`exercises.${index}.exercise_category`}
                                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                >
                                                    <option value="">Seleccione una categoría</option>
                                                    {Object.entries(exerciseCategories).map(([key, value]) => (
                                                        <option key={key} value={value}>
                                                            {value}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        />
                                        {errors.exercises?.[index]?.exercise_category && <p className="text-red-500 text-xs italic">{errors.exercises[index].exercise_category?.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`exercises.${index}.calories_burned`}>
                                            Calorías (cal)
                                        </label>
                                        <input
                                            id={`exercises.${index}.calories_burned`}
                                            type="number"
                                            placeholder="Ej. 300"
                                            {...register(`exercises.${index}.calories_burned`, {
                                                required: "Las calorías son obligatorias",
                                                min: { value: 1, message: "Las calorías deben ser mayores a 0" }
                                            })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            min={0}
                                        />
                                        {errors.exercises?.[index]?.calories_burned && <p className="text-red-500 text-xs italic">{errors.exercises[index].calories_burned?.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`exercises.${index}.duration`}>
                                            Duración (minutos)
                                        </label>
                                        <input
                                            id={`exercises.${index}.duration`}
                                            type="number"
                                            placeholder="Ej. 30"
                                            {...register(`exercises.${index}.duration`, {
                                                required: "La duración es obligatoria",
                                                min: { value: 1, message: "La duración debe ser mayor a 0" }
                                            })}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            min={0}
                                        />
                                        {errors.exercises?.[index]?.duration && <p className="text-red-500 text-xs italic">{errors.exercises[index].duration?.message}</p>}
                                    </div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button type="button" onClick={() => handleRemoveExercise(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Eliminar Ejercicio
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button type="button" onClick={handleAddExercise} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                            Añadir Ejercicio
                        </button>
                    </div>

                    <div className="flex items-center justify-end mt-8">
                        <button onClick={closeForm} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-center font-semibold mr-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Cerrar
                        </button>
                        <button type="submit" className="bg-slate-700 hover:bg-slate-800 text-white text-center font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Crear Rutina
                        </button>
                    </div>
                </form>
            </div>
            {showSuccessModal && (
                <ModalSuccess
                    title="¡Rutina creada exitosamente!"
                    description="Tu nueva rutina ha sido guardada."
                    route="/user-routines"
                    button="Ir a mis rutinas"
                    onClose={handleCloseAll}
                />
            )}
        </div>
    );
};