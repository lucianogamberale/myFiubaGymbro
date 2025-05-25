import { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { ModalSuccess } from "../ModalSuccess";
import { useAuth } from '../../auth/AuthProvider';
import Loading from '../Loading';
import { foodCategories } from '../../utils/constants/foodCategories';

interface Props {
	dietId: number;
	setOpenForm: (value: boolean) => void;
	onUpdateDiet: () => void;
}

type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

interface DietMealEntryForm {
  day_of_week: DayOfWeek;
  time_of_day: string;
  food_name: string;
  food_category: string;
  calories: number;
}

interface DietForm {
  name: string;
  description?: string;
  meals: DietMealEntryForm[];
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

export const DietEditForm = ({ dietId, setOpenForm, onUpdateDiet }: Props) => {
	const auth = useAuth();
	const user_id = auth.getUserId();

	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<DietForm>({
		defaultValues: {
			name: '',
			description: '',
			meals: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'meals',
	});

	const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDietDetails = async () => {
            if (!user_id || !dietId) {
                setError('ID de usuario o dieta no proporcionado.');
                setLoading(false);
                return;
            }
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`http://localhost:8000/api/users/${user_id}/diets/${dietId}`);
                if (!response.ok) throw new Error('Error al obtener los detalles de la dieta para edición.');
                const data = await response.json();

                reset({
                    name: data.name,
                    description: data.description,
                    meals: data.meals.map((meal: any) => ({
                        day_of_week: meal.day_of_week,
                        time_of_day: meal.time_of_day.substring(0, 5),
                        food_name: meal.food_name,
                        food_category: meal.food_category,
                        calories: meal.calories,
                    })),
                });

            } catch (err: any) {
                console.error('Error fetching diet details for edit:', err);
                setError(err.message || 'No se pudieron cargar los detalles de la dieta para edición.');
            } finally {
                setLoading(false);
            }
        };

        fetchDietDetails();
    }, [dietId, user_id, reset]);

	function closeForm() {
		setOpenForm(false);
	}
	function handleCloseAll() {
		setShowSuccessModal(false);
		closeForm();
	}

	const handleAddMeal = () => {
		append({
			day_of_week: "MONDAY",
			time_of_day: "12:00",
			food_name: "",
			food_category: "",
			calories: 0,
		});
	};

	const handleRemoveMeal = (indexToRemove: number) => {
		remove(indexToRemove);
	};

	const onSubmit = async (data: DietForm) => {
		if (!user_id || !dietId) {
			alert('ID de usuario o dieta no disponible. Por favor, inicie sesión o seleccione una dieta.');
			return;
		}

		const dietData = {
			name: data.name,
			description: data.description,
			meals: data.meals.map(meal => ({
				day_of_week: meal.day_of_week,
				time_of_day: meal.time_of_day + ":00",
				food_name: meal.food_name,
				food_category: meal.food_category,
				calories: Number(meal.calories),
			})),
		};

		try {
			const response = await fetch(`http://localhost:8000/api/users/${user_id}/diets/${dietId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dietData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.detail || 'Error al actualizar la dieta');
			}

			console.log('Dieta actualizada con éxito.');
			setShowSuccessModal(true);
			onUpdateDiet();
		} catch (error: any) {
			console.error('Error al actualizar la dieta:', error.message);
			alert(`Error al actualizar la dieta: ${error.message}`);
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
                    <h1 className="text-xl font-semibold text-red-600 mb-4 text-center">Error al cargar dieta</h1>
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
						<h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Editar Dieta</h2>

						<div className="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="dietName">
								Nombre de la Dieta:
							</label>
							<input
								type="text"
								id="dietName"
								{...register('name', { required: 'El nombre es obligatorio' })}
								className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? 'border-red-500' : ''}`}
							/>
							{errors.name && <p className="text-red-500 text-xs italic">{errors.name.message}</p>}
						</div>

						<div className="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="dietDescription">
								Descripción (opcional):
							</label>
							<textarea
								id="dietDescription"
								{...register('description')}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							></textarea>
						</div>

						<h3 className="text-xl font-bold text-slate-700 mb-4 mt-6">Comidas de la Dieta</h3>
						<div className="diet-meals-list space-y-4">
							{fields.map((field, index) => (
								<div key={field.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
									<h4 className="text-lg font-semibold text-slate-600 mb-4">Comida #{index + 1}</h4>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-gray-700 text-sm font-bold mb-1">Día de la semana:</label>
											<Controller
												name={`meals.${index}.day_of_week`}
												control={control}
												defaultValue={field.day_of_week}
												rules={{ required: 'El día es obligatorio' }}
												render={({ field: controllerField }) => (
													<select {...controllerField} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.meals?.[index]?.day_of_week ? 'border-red-500' : ''}`}>
														{daysOfWeek.map(day => (
															<option key={day} value={day}>{dayDisplayNames[day]}</option>
														))}
													</select>
												)}
											/>
											{errors.meals?.[index]?.day_of_week && <p className="text-red-500 text-xs italic">{errors.meals[index].day_of_week?.message}</p>}
										</div>

										<div>
											<label className="block text-gray-700 text-sm font-bold mb-1">Hora (HH:MM):</label>
											<Controller
												name={`meals.${index}.time_of_day`}
												control={control}
												defaultValue={field.time_of_day}
												rules={{
													required: 'La hora es obligatoria',
													pattern: {
														value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
														message: 'Formato de hora inválido (HH:MM)'
													}
												}}
												render={({ field: controllerField }) => (
													<input
														type="time"
														{...controllerField}
														className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.meals?.[index]?.time_of_day ? 'border-red-500' : ''}`}
													/>
												)}
											/>
											{errors.meals?.[index]?.time_of_day && <p className="text-red-500 text-xs italic">{errors.meals[index].time_of_day?.message}</p>}
										</div>

										<div>
											<label className="block text-gray-700 text-sm font-bold mb-1">Comida:</label>
											<input // Cambiado a input type="text"
												type="text"
												id={`meals.${index}.food_name`}
												placeholder="Ej. Arroz con pollo"
												{...register(`meals.${index}.food_name`, { required: "El nombre de la comida es obligatorio" })}
												className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.meals?.[index]?.food_name ? 'border-red-500' : ''}`}
											/>
											{errors.meals?.[index]?.food_name && <p className="text-red-500 text-xs italic">{errors.meals[index].food_name?.message}</p>}
										</div>

										<div>
											<label className="block text-gray-700 text-sm font-bold mb-1">Categoría:</label>
											<Controller
												name={`meals.${index}.food_category`}
												control={control}
												defaultValue={field.food_category}
												rules={{ required: 'La categoría es obligatoria' }}
												render={({ field: controllerField }) => (
													<select {...controllerField} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.meals?.[index]?.food_category ? 'border-red-500' : ''}`}>
														<option value="">Selecciona una categoría</option>
														{foodCategories.map((category) => (
															<option key={category} value={category}>{category}</option>
														))}
													</select>
												)}
											/>
											{errors.meals?.[index]?.food_category && <p className="text-red-500 text-xs italic">{errors.meals[index].food_category?.message}</p>}
										</div>

										<div className="col-span-full">
											<label className="block text-gray-700 text-sm font-bold mb-1">Calorías:</label>
											<Controller
												name={`meals.${index}.calories`}
												control={control}
												defaultValue={field.calories}
												rules={{ required: 'Las calorías son obligatorias', min: { value: 1, message: 'Debe ser al menos 1 caloría' } }}
												render={({ field: controllerField }) => (
													<input
														type="number"
														min={1}
														{...controllerField}
														onChange={e => controllerField.onChange(Number(e.target.value))}
														className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.meals?.[index]?.calories ? 'border-red-500' : ''}`}
													/>
												)}
											/>
											{errors.meals?.[index]?.calories && <p className="text-red-500 text-xs italic">{errors.meals[index].calories?.message}</p>}
										</div>
									</div>
									<div className="flex justify-end mt-4">
										<button type="button" onClick={() => handleRemoveMeal(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
											Eliminar Comida
										</button>
									</div>
								</div>
							))}
						</div>

						<div className="flex justify-center mt-6">
							<button type="button" onClick={handleAddMeal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
								Añadir Comida
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
					title="¡Actualizada con éxito!"
					description="La dieta ha sido actualizada con éxito."
					route="/user-diets"
					button="Ir a mis dietas"
					onClose={handleCloseAll}
				/>
			}
		</>
	)
}