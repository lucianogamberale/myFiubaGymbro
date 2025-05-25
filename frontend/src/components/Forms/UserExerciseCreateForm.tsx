import { useState } from "react";
import { ModalSuccess } from "../ModalSuccess";
import { useAuth } from '../../auth/AuthProvider';


interface Props {
	setOpenForm: (value: boolean) => void;
	onNewUserExercise: () => void;
}

export const UserExerciseCreateForm = ({ setOpenForm, onNewUserExercise }: Props) => {
	const auth = useAuth();
	const user_id = auth.getUserId();

	// STRENGTH = "Fuerza"
	// CARDIO = "Cardio"
	// FLEXIBILITY = "Flexibilidad"
	// BALANCE = "Equilibrio"
	// ENDURANCE = "Resistencia"
	// SPEED = "Velocidad"
	// AGILITY = "Agilidad"
	// COORDINATION = "Coordinación"
	// POWER = "Potencia"

	const availableExerciseCategories = {
		"Fuerza": "Fuerza",
		"Cardio": "Cardio",
		"Flexibilidad": "Flexibilidad",
		"Equilibrio": "Equilibrio",
		"Resistencia": "Resistencia",
		"Velocidad": "Velocidad",
		"Agilidad": "Agilidad",
		"Coordinación": "Coordinación",
		"Potencia": "Potencia",
	}

	const [exerciseCategory, setExerciseCategory] = useState('');
	const [exerciseName, setExerciseName] = useState('');
	const [calories, setCalories] = useState('');
	const [dateTime, setDatetime] = useState(new Date().toISOString().slice(0, 16));
	const [exerciseDuration, setExerciseDuration] = useState('');

	const [showSuccessModal, setShowSuccessModal] = useState(false);

	function closeForm() {
		setOpenForm(false);
	}
	function handleCloseAll() {
		setShowSuccessModal(false);
		closeForm();
	}

	async function createUserFood() {
		try {
			const response = await fetch(`http://localhost:8000/api/user-exercises/${user_id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"exercise_category": exerciseCategory,
					"exercise_name": exerciseName,
					"calories": calories,
					"date": dateTime,
					"duration": exerciseDuration,
				}),
			});
			if (response.ok) {
				console.log("Creado con exito");
				setShowSuccessModal(true);
				onNewUserExercise();
			}
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		createUserFood();
	}

	return (
		<>
			<div className="relative z-60">
				<div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity"></div>
				<div className="fixed inset-0 z-50 w-screen overflow-y-auto flex justify-center items-center">
					<form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg xl:w-2/4 p-10">
						<div className="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="category">
								Categoría
							</label>
							<select
								value={exerciseCategory}
								onChange={(e) => setExerciseCategory(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="category"
								required>
								<option value="" disabled>Selecciona una categoría</option>
								{Object.entries(availableExerciseCategories).map(([key, value]) => (
									<option key={key} value={key}>
										{value}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="name">
								Nombre
							</label>
							<input
								value={exerciseName}
								onChange={(e) => setExerciseName(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="name"
								type="text"
								placeholder="ej. Running"
								required />
						</div>
						<div className="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="datetime">
								Fecha y hora
							</label>
							<input
								value={dateTime}
								onChange={(e) => setDatetime(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="datetime"
								type="datetime-local"
								required />
						</div>
						<div className="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="calories">
								Calorías quemadas [cal]
							</label>
							<input
								value={calories}
								onChange={(e) => setCalories(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="username"
								type="number"
								min={1}
								placeholder="ej. 100"
								required />
						</div>
						<div className="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="duration">
								Duración [min]
							</label>
							<input
								value={exerciseDuration}
								onChange={(e) => setExerciseDuration(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="duration"
								type="number"
								min={1}
								placeholder="ej. 30"
								required
							/>
						</div>
						<div className="flex items-center justify-end">
							<button onClick={closeForm} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-center font-semibold mr-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
								Cerrar
							</button>
							<button type="submit" className="bg-slate-700 hover:bg-slate-800 text-white text-center font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
								Crear
							</button>
						</div>
					</form>
				</div>
			</div>

			{showSuccessModal &&
				<ModalSuccess title="¡Creado con éxito!" description="El ejercicio ha sido creado con éxito" route="/user-exercises" button="Ir a mis ejercicios" onClose={handleCloseAll} />
			}
		</>
	)
}