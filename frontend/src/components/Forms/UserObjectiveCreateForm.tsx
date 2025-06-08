import React, { useState } from "react";
import { ModalSuccess } from "../ModalSuccess";
import { useAuth } from '../../auth/AuthProvider';


interface Props {
	setOpenForm: (value: boolean) => void;
	onNewUserObjective: () => void;
}

export const UserObjectiveCreateForm = ({ setOpenForm, onNewUserObjective }: Props) => {
	const auth = useAuth();
	const user_id = auth.getUserId();

	const availableObjectiveCategories = {
		'Correr': 'Correr',
		'Caminar': 'Caminar',
		'Bicicleta': 'Bicicleta',
		'Ganar peso': 'Ganar peso',
		'Perder peso': 'Perder peso',
	};

	// Categories that use km as unit of measurement
	const kmCategories = new Set(['Correr', 'Caminar', 'Bicicleta']);

	// Function to get unit of measurement based on category
	const getExampleValue = (category: string): string => {
		return kmCategories.has(category) ? '10 km' : '1900 kcal';
	};

	const [objectiveCategory, setObjectiveCategory] = useState('');
	const [objectiveName, setObjectiveName] = useState('');
	const [endDateTime, setEndDateTime] = useState('');

	const [showSuccessModal, setShowSuccessModal] = useState(false);

	function closeForm() {
		setOpenForm(false);
	}
	function handleCloseAll() {
		setShowSuccessModal(false);
		closeForm();
	}

	async function createUserObjective() {
		try {
			const response = await fetch(`http://localhost:8000/api/user-objectives/${user_id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"activity": objectiveCategory,
					"current_progress": 0,
					"objective": objectiveName,
					"unit_of_measurement": "",
					"start_date": new Date().toISOString(),
					"end_date": endDateTime
				}),
			});
			if (response.ok) {
				console.log("Creado con exito");
				setShowSuccessModal(true);
				onNewUserObjective();
			}
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		createUserObjective();
	}

	return (
		<>
			<div className="relative z-60">
				<div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity"></div>
				<div className="fixed inset-0 z-50 w-screen overflow-y-auto flex justify-center items-center">
					<form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg xl:w-2/4 p-10">
						<div className	="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="category">
								Actividad
							</label>
							<select
								value={objectiveCategory}
								onChange={(e) => setObjectiveCategory(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="category"
								required>
								<option value="" disabled>Selecciona una actividad</option>
								{Object.entries(availableObjectiveCategories).map(([key, value]) => (
									<option key={key} value={key}>
										{value}
									</option>
								))}
							</select>
						</div>
						<div className="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="name">
								Objetivo
							</label>
							<input
								value={objectiveName}
								onChange={(e) => {
									setObjectiveName(e.target.value);
									// Update placeholder when category changes
									const input = e.target;
									input.placeholder = objectiveCategory ? `ej. ${getExampleValue(objectiveCategory)}` : '';
								}}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="name"
								type="number"
								placeholder={objectiveCategory ? `ej. ${getExampleValue(objectiveCategory)}` : ''}
								required />
						</div>
						<div className="mb-4">
							<label className="text-start block text-gray-700 text-lg font-bold mb-2" htmlFor="datetime">
								Fecha y hora de finalización
							</label>
							<input
								value={endDateTime}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEndDateTime(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="datetime"
								type="datetime-local"
								required />
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
				<ModalSuccess title="¡Creado con éxito!" description="El objetivo ha sido cargado con éxito" route="/user-objectives" button="Ir a mis objetivos" onClose={handleCloseAll} />
			}
		</>
	)
}