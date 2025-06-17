import { useState } from "react";
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { ModalSuccess } from "../ModalSuccess";
import { useAuth } from '../../auth/AuthProvider';
import { foodCategories } from '../../utils/constants/foodCategories';

interface Props {
	setOpenForm: (value: boolean) => void;
	onNewDiet: () => void;
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


export const DietCreateForm = ({ setOpenForm, onNewDiet }: Props) => {
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
			name: "",
			description: "",
			meals: [{ day_of_week: "MONDAY", time_of_day: "08:00", food_name: "", food_category: "", calories: 0 }]
		}
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "meals",
	});

	const [showSuccessModal, setShowSuccessModal] = useState(false);

	function closeForm() {
		setOpenForm(false);
	}

	function handleCloseAll() {
		setShowSuccessModal(false);
		closeForm();
	}

	const handleAddMeal = () => {
		append({ day_of_week: "MONDAY", time_of_day: "08:00", food_name: "", food_category: "", calories: 0 });
	};

	const handleRemoveMeal = (index: number) => {
		remove(index);
	};


	const onSubmit = async (data: DietForm) => {
		if (!user_id) {
			console.error("User ID not found.");
			return;
		}

		const dietDataToSend = {
			...data,
			meals: data.meals.map(meal => ({
				...meal,
				calories: Number(meal.calories),
				time_of_day: meal.time_of_day + ':00'
			}))
		};

		try {
			const response = await fetch(`http://localhost:8000/api/users/${user_id}/diets`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(dietDataToSend),
			});

			if (response.ok) {
				reset();
				setShowSuccessModal(true);
				onNewDiet();
			} else {
				const errorData = await response.json();
				console.error('Error creating diet:', errorData);
				alert(`Error al crear la dieta: ${errorData.detail || response.statusText}`);
			}
		} catch (error) {
			console.error('Error creating diet:', error);
			alert('Error al crear la dieta. Intente de nuevo más tarde.');
		}
	};

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
			<div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
				<h2 className="text-2xl font-bold text-center text-slate-700 mb-6">Crear Nueva Dieta</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="name">
							Nombre de la Dieta
						</label>
						<input
							id="name"
							type="text"
							placeholder="Dieta para ganar masa muscular"
							{...register("name", { required: "El nombre de la dieta es obligatorio" })}
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
							placeholder="Una dieta balanceada para...."
							{...register("description")}
							rows={3}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						></textarea>
					</div>

					<h3 className="text-xl font-bold text-slate-700 mt-8 mb-4 border-b pb-2">Comidas de la Dieta</h3>
					<div className="space-y-6">
						{fields.map((field, index) => (
							<div key={field.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
								<h4 className="text-lg font-semibold text-slate-600 mb-3">Comida #{index + 1}</h4>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`meals.${index}.day_of_week`}>
											Día de la semana
										</label>
										<Controller
											name={`meals.${index}.day_of_week`}
											control={control}
											rules={{ required: "El día de la semana es obligatorio" }}
											render={({ field }) => (
												<select
													{...field}
													id={`meals.${index}.day_of_week`}
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
										{errors.meals?.[index]?.day_of_week && <p className="text-red-500 text-xs italic">{errors.meals[index].day_of_week?.message}</p>}
									</div>
									<div>
										<label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`meals.${index}.time_of_day`}>
											Hora del día
										</label>
										<input
											id={`meals.${index}.time_of_day`}
											type="time"
											{...register(`meals.${index}.time_of_day`, { required: "La hora es obligatoria" })}
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										/>
										{errors.meals?.[index]?.time_of_day && <p className="text-red-500 text-xs italic">{errors.meals[index].time_of_day?.message}</p>}
									</div>
									<div>
										<label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`meals.${index}.food_name`}>
											Nombre de la Comida
										</label>
										<input // Cambiado a input type="text"
											id={`meals.${index}.food_name`}
											type="text"
											placeholder="Ej. Arroz con pollo"
											{...register(`meals.${index}.food_name`, { required: "El nombre de la comida es obligatorio" })}
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										/>
										{errors.meals?.[index]?.food_name && <p className="text-red-500 text-xs italic">{errors.meals[index].food_name?.message}</p>}
									</div>
									<div>
										<label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`meals.${index}.food_category`}>
											Categoría de Comida
										</label>
										<Controller
											name={`meals.${index}.food_category`}
											control={control}
											rules={{ required: "La categoría de comida es obligatoria" }}
											render={({ field }) => (
												<select
													{...field}
													id={`meals.${index}.food_category`}
													className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												>
													<option value="">Seleccione una categoría</option>
													{Object.entries(foodCategories).map(([key, value]) => (
														<option key={key} value={value}>
															{value}
														</option>
													))}
												</select>
											)}
										/>
										{errors.meals?.[index]?.food_category && <p className="text-red-500 text-xs italic">{errors.meals[index].food_category?.message}</p>}
									</div>
									<div>
										<label className="block text-gray-700 text-md font-bold mb-2" htmlFor={`meals.${index}.calories`}>
											Calorías (cal)
										</label>
										<input
											id={`meals.${index}.calories`}
											type="number"
											placeholder="Ej. 300"
											{...register(`meals.${index}.calories`, {
												required: "Las calorías son obligatorias",
												min: { value: 1, message: "Las calorías deben ser mayores a 0" }
											})}
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											min={0}
										/>
										{errors.meals?.[index]?.calories && <p className="text-red-500 text-xs italic">{errors.meals[index].calories?.message}</p>}
									</div>
								</div>
								<div className="flex justify-end mt-4">
									<button type="button" onClick={() => handleRemoveMeal(index)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
										Borrar Comida
									</button>
								</div>
							</div>
						))}
					</div>

					<div className="flex justify-center mt-6">
						<button type="button" onClick={handleAddMeal} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
							Añadir Comida
						</button>
					</div>

					<div className="flex items-center justify-end mt-8">
						<button onClick={closeForm} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-center font-semibold mr-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
							Cerrar
						</button>
						<button type="submit" className="bg-slate-700 hover:bg-slate-800 text-white text-center font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							Crear Dieta
						</button>
					</div>
				</form>
			</div>
			{showSuccessModal && (
				<ModalSuccess
					title="¡Dieta creada exitosamente!"
					description="Tu nueva dieta ha sido guardada."
					route="/user-diets"
					button="Ir a mis dietas"
					onClose={handleCloseAll}
				/>
			)}
		</div>
	);
};