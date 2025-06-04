import { useState, useEffect } from "react";
import { ModalSuccess } from "../ModalSuccess";
import { useAuth } from '../../auth/AuthProvider';
import { UserHealthDataEntry } from '../ItemsList/UserHealthDataList'

interface Props {
	setOpenForm: (value: boolean) => void;
	onNewUserHealthData: () => void;
}

export const UserHealthDataCreateForm = ({ setOpenForm, onNewUserHealthData }: Props) => {

	const [lastUserHealthData, setLastUserHealthData] = useState<UserHealthDataEntry | null>(null);
	
	const fetchData = () => {
		fetch(`http://localhost:8000/api/user-health-data/${user_id}/last`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json()
			})
			.then(data => {
				setLastUserHealthData(data);
			})
			.catch(error => {
				console.error('Error fetching data:', error)
				setLastUserHealthData(null);
			});
	};
	
	useEffect(() => {
		fetchData();
	}, []);

	const auth = useAuth();
	const user_id = auth.getUserId();

	const [weight, setWeight] = useState('');
	const [height, setHeight] = useState('');
	const [date, setDatetime] = useState(new Date().toISOString().slice(0, 10));

	// Set height from last health data if it exists
	useEffect(() => {
		if (lastUserHealthData?.height) {
			setHeight(lastUserHealthData.height.toString());
		}
	}, [lastUserHealthData]);

	const [showSuccessModal, setShowSuccessModal] = useState(false);

	function closeForm() {
		setOpenForm(false);
	}
	function handleCloseAll() {
		setShowSuccessModal(false);
		closeForm();
	}

	async function createUserHealthData() {
		try {
			const response = await fetch(`http://localhost:8000/api/user-health-data/${user_id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"weight": weight,
					"height": height,
					"date": date,
				}),
			});
			if (response.ok) {
				console.log("Creado con exito");
				setShowSuccessModal(true);
				onNewUserHealthData();
			}
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		createUserHealthData();
	}

	return (
		<>
			<div className="relative z-60">
				<div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity"></div>
				<div className="fixed inset-0 z-50 w-screen overflow-y-auto flex justify-center items-center">
					<form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg xl:w-2/4 p-10">
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weight">
								Peso [kg]
							</label>
							<input
								type="number"
								id="weight"
								value={weight}
								onChange={(e) => setWeight(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="ej. 70"
								min={0}
								required
							/>
						</div>
							{!lastUserHealthData?.height && (
								<div className="mb-4">
									<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="height">
										Altura [cm]
									</label>
									<input
										type="number"
										id="height"
										value={height}
										onChange={(e) => setHeight(e.target.value)}
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										placeholder="ej. 170"
										min={0}
										required
									/>
								</div>
							)}
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
								Fecha
							</label>
							<input
								type="date"
								id="date"
								value={date}
								onChange={(e) => setDatetime(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
				<ModalSuccess title="¡Creado con éxito!" description="Los datos de salud se cargaron con éxito" route="/user-health-data" button="Ir a mi salud" onClose={handleCloseAll} />
			}
		</>
	)
}