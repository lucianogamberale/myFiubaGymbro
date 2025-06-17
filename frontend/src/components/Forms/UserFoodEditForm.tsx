import { useEffect, useState } from "react";
import { useAuth } from '../../auth/AuthProvider';
import Loading from "../Loading";


interface Props {
	userFoodId: number,
	setOpenForm: (value: boolean) => void;
	onEditUserFood: () => void;
}

export const UserFoodEditForm = ({ userFoodId, setOpenForm, onEditUserFood }: Props) => {
	const auth = useAuth();
	const userId = auth.getUserId();

	const availableFoodCategories = {
		"Fruta": "Fruta",
		"Vegetal": "Vegetal",
		"Proteína": "Proteína",
		"Grano": "Grano",
		"Lácteo": "Lácteo",
		"Graso": "Graso",
		"Dulces": "Dulces",
	}

	const [foodCategory, setFoodCategory] = useState('');
	const [foodName, setFoodName] = useState('');
	const [calories, setCalories] = useState('');
	const [dateTime, setDatetime] = useState(new Date().toISOString().slice(0, 16));

	const [loading, setLoading] = useState(true);

	async function fetchData() {
		try {
			const response = await fetch(`http://localhost:8000/api/user-foods/${userId}/foods/${userFoodId}`, {
				method: 'GET'
			});
			if (response.ok) {
				const data = await response.json();
				setFoodCategory(data.food_category);
				setFoodName(data.food_name);
				setCalories(data.calories);
				setDatetime(data.date);
			} else {
				console.error("Error fetching user food data");
			}
		} catch (error) {
			console.error("Error fetching user food:", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		if (userId) {
			fetchData();
		}
	}, [userId]);

	function closeForm() {
		setOpenForm(false);
	}

	async function updateUserFood() {
		try {
			const response = await fetch(`http://localhost:8000/api/user-foods/${userId}/foods/${userFoodId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"food_category": foodCategory,
					"food_name": foodName,
					"calories": calories,
					"date": dateTime,
				}),
			});
			if (response.ok) {
				console.log("Creada con exito");
				onEditUserFood();
			}
		} catch (error) {
			console.error("Error al realizar la solicitud:", error);
		}
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		updateUserFood();
	}

	if (loading) {
		return (
			<div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 transition-opacity">
				<Loading />
			</div>
		);
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
								value={foodCategory}
								onChange={(e) => setFoodCategory(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="category"
								required>
								<option value="" disabled>Selecciona una categoría</option>
								{Object.entries(availableFoodCategories).map(([key, value]) => (
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
								value={foodName}
								onChange={(e) => setFoodName(e.target.value)}
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="name"
								type="text"
								placeholder="ej. Manzana"
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
								Calorías ingeridas [cal]
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
		</>
	)
}