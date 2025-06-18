import React, { useState } from "react";
import { ModalSuccess } from "../ModalSuccess";
import { useAuth } from '../../auth/AuthProvider';
import { UserObjectiveEntry } from '../ItemsList/UserObjectivesList';

interface Props {
	setOpenForm: (value: boolean) => void;
	userObjective: UserObjectiveEntry;
	onUserObjectiveEdited: (id: number) => void;
}

export const UserObjectiveEditForm = ({ setOpenForm, userObjective , onUserObjectiveEdited }: Props) => {
	const auth = useAuth();
	const user_id = auth.getUserId();

	const availableObjectiveCategories = {
		'Ganar peso': 'Ganar peso',
		'Perder peso': 'Perder peso',
	};


	// Function to get unit of measurement based on category
	const getExampleValue = (): string => {
		return '1900 cal';
	};

	const [objectiveCategory, setObjectiveCategory] = useState(userObjective.activity);
	const [objectiveName, setObjectiveName] = useState(userObjective.objective.toString());
	const [endDateTime, setEndDateTime] = useState(new Date(userObjective.end_date).toISOString().slice(0, 16));

	const [showSuccessModal, setShowSuccessModal] = useState(false);

	function closeForm() {
		setOpenForm(false);
	}
	function handleCloseAll() {
		setShowSuccessModal(false);
		closeForm();
	}

	async function updateUserObjective() {
		try {
			const response = await fetch(`http://localhost:8000/api/user-objectives/${user_id}/${userObjective.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"activity": objectiveCategory,
					"current_progress": userObjective.current_progress,
					"objective": objectiveName,
					"unit_of_measurement": "",
					"start_date": userObjective.start_date,
					"end_date": endDateTime
				}),
			});
			if (response.ok) {
				console.log("Creado con exito");
				setShowSuccessModal(true);
				onUserObjectiveEdited(userObjective.id);
			}
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		updateUserObjective();
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
									input.placeholder = objectiveCategory ? `ej. ${getExampleValue()}` : '';
								}}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="name"
								type="number"
								placeholder={objectiveCategory ? `ej. ${getExampleValue()}` : ''}
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
								Guardar
							</button>
						</div>
					</form>
				</div>
			</div>

			{showSuccessModal &&
				<ModalSuccess 
					title="¡Actualizado con éxito!" 
					description="El objetivo ha sido actualizado correctamente" 
					route="/user-objectives" 
					button="Volver a mis objetivos" 
					onClose={handleCloseAll} 
				/>
			}
		</>
	)
}