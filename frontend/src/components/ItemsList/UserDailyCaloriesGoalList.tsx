import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthProvider';
import { UserDailyCaloriesGoalCreateForm } from '../Forms/UserDailyCaloriesGoalCreateForm';
import { UserDailyCaloriesGoalRecommendationForm } from '../Forms/UserDailyCaloriesRecommendationForm';


interface Props {
    updateUserDailyCaloriesGoal: boolean;
    onUpdateUserDailyCaloriesGoal: (value: boolean) => void;
}

type UserDailyCaloriesGoalEntry = {
    id: number;
    objective: string;
    amount_of_calories: number;
    date: string;
};

export const UserDailyCaloriesGoalList = ({ updateUserDailyCaloriesGoal, onUpdateUserDailyCaloriesGoal }: Props) => {
    const auth = useAuth();
    const user_id = auth.getUserId();

    const [lastUserDailyCaloriesGoal, setLastUserDailyCaloriesGoal] = useState<UserDailyCaloriesGoalEntry | null>(null);

    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const fetchData = () => {

        fetch(`http://localhost:8000/api/user-daily-calories-goal/${user_id}/last`, {
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
                setLastUserDailyCaloriesGoal(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error)
                setLastUserDailyCaloriesGoal(null);
            });
    };

    useEffect(() => {
        if (updateUserDailyCaloriesGoal) {
            fetchData();
            onUpdateUserDailyCaloriesGoal(false);
        }
    }, [updateUserDailyCaloriesGoal]);

    const handleNewUserDailyCaloriesGoal = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="h-full flex flex-col overflow-ayto">
            <div className="border-t border-gray-300 my-3"></div>
            <div className="text-3xl text-slate-900 ml-3 font-bold flex items-center">
                <span>Mi Objetivo Diario de Calorías</span>
                <button onClick={() => setOpen1(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 ml-auto rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Nuevo objetivo diario
                </button>
                <button onClick={() => setOpen2(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 ml-2 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Recomendación
                </button>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            {lastUserDailyCaloriesGoal && (
                <div>
                    <div className="flex flex-col gap-4 p-4">
                        <div className="bg-gray-100 text-gray-700 shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-300 transform">
                            <div className="text-3xl font-semibold">Calorías: </div>
                            <div className="text-gray-700">{lastUserDailyCaloriesGoal.amount_of_calories} cal</div>
                        </div>
                    </div>
                </div>
            )}



            {open1 && <UserDailyCaloriesGoalCreateForm set_open_form={setOpen1} on_new_user_daily_calories_goal={handleNewUserDailyCaloriesGoal}></UserDailyCaloriesGoalCreateForm>}
            {open2 && <UserDailyCaloriesGoalRecommendationForm set_open_form={setOpen2} on_new_user_daily_calories_goal={handleNewUserDailyCaloriesGoal}></UserDailyCaloriesGoalRecommendationForm>}
        </div>
    );
};