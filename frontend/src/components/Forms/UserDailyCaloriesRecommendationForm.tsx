import { useState, useEffect } from "react";
import { ModalSuccess } from "../ModalSuccess";
import { useAuth } from '../../auth/AuthProvider';
import { UserHealthDataEntry } from '../ItemsList/UserHealthDataList'

interface Props {
    set_open_form: (value: boolean) => void;
    on_new_user_daily_calories_goal: () => void;
}

export const UserDailyCaloriesGoalRecommendationForm = ({ set_open_form, on_new_user_daily_calories_goal }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    type CalorieObjective = 'Pérdida de peso' | 'Mantenimiento' | 'Ganancia de peso';
    type CalorieRecommendations = {
        [key in CalorieObjective]: number;
    };

    const calorieRecommendations: CalorieRecommendations = {
        'Pérdida de peso': 1500,
        'Mantenimiento': 2000,
        'Ganancia de peso': 2500
    };

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

    const [objective, set_objective] = useState('');
    const [amount_of_calories, set_amount_of_calories] = useState('');

    const [show_success_modal, set_show_success_modal] = useState(false);

    function close_form() {
        set_open_form(false);
    }
    function handle_close_all() {
        set_show_success_modal(false);
        close_form();
    }

    async function create_user_daily_calories_goal() {
        try {
            const response = await fetch(`http://localhost:8000/api/user-daily-calories-goal/${user_id}`, {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "amount_of_calories": parseInt(amount_of_calories),
                    "date": new Date().toISOString().slice(0, 10)
                }),
            });
            if (response.ok) {
                console.log("Creado con exito");
                set_show_success_modal(true);
                on_new_user_daily_calories_goal();
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        create_user_daily_calories_goal();
    }

    return (
        <>
            <div className="relative z-60">
                <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                <div className="fixed inset-0 z-50 w-screen overflow-y-auto flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg xl:w-2/4 p-10">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="objective">
                                Objetivo a elegir
                            </label>
                            <select
                                value={objective}
                                onChange={(e) => {
                                    const selectedObjective = e.target.value as CalorieObjective;
                                    set_objective(selectedObjective);
                                    // Set recommended calories when objective changes
                                    const calorieValue = calorieRecommendations[selectedObjective];
                                    if (selectedObjective && lastUserHealthData) {
                                        set_amount_of_calories((lastUserHealthData.height/170 * lastUserHealthData.weight/60 * calorieValue | 0).toString());
                                    } else {
                                        set_amount_of_calories(calorieValue.toString());
                                    }
                                }}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="objective"
                                required>
                                <option value="" disabled>Selecciona un objetivo</option>
                                {Object.entries(calorieRecommendations).map(([key]) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount_of_calories">
                                Calorías
                            </label>
                            <input
                                type="number"
                                id="amount_of_calories"
                                value={amount_of_calories}
                                onChange={(e) => set_amount_of_calories(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="ej. 2000"
                                min={0}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-end">
                            <button onClick={close_form} className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-center font-semibold mr-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Cerrar
                            </button>
                            <button type="submit" className="bg-slate-700 hover:bg-slate-800 text-white text-center font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                Crear
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {show_success_modal &&
                <ModalSuccess title="¡Creado con éxito!" description="El objetivo diario ha sido cargado con éxito." route="/user-daily-calories-goal" button="Ir a mis calorías diarias" onClose={handle_close_all} />
            }
        </>
    )
}