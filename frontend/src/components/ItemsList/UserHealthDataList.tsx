import { useState, useEffect } from 'react';
import { UserHealthDataCreateForm } from '../Forms/UserHealthDataCreateForm';


interface Props {
    updateUserHealthData: boolean;
    onUpdateUserHealthData: (value: boolean) => void;
}



export const UserHealthDataList = ({ updateUserHealthData, onUpdateUserHealthData }: Props) => {
    // const auth = useAuth();
    // const user_id = auth.getUserId();

    // const [userFoods, setUserFoods] = useState<UserFoodEntry[]>([])
    const [open, setOpen] = useState(false);
    // const [loading, setLoading] = useState(false);

    const fetchData = () => {
        // fetch(`http://localhost:8000/api/user-foods/${user_id}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         setUserFoods(data);
        //         setLoading(false);
        //     })
        //     .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        if (updateUserHealthData) {
            fetchData();
            onUpdateUserHealthData(false);
        }
    }, [updateUserHealthData]);

    const handleNewUserFood = () => {
        fetchData();
    };

    // useEffect(() => {
    //     setLoading(true);
    //     fetchData();
    // }, []);

    return (
        <div className="h-full flex flex-col overflow-ayto">
            <div className="border-t border-gray-300 my-3"></div>
            <div className="text-3xl text-slate-900 ml-3 font-bold flex justify-between items-center">
                <span>Mi Salud</span>
                <button onClick={() => setOpen(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Cargar datos personales
                </button>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="text-lg text-slate-400 text-center mt-3">Aún no se pueden visualizar los datos cargados.</div>

            {open && <UserHealthDataCreateForm setOpenForm={setOpen} onNewUserHealthData={handleNewUserFood}></UserHealthDataCreateForm>}
        </div >
    );
};