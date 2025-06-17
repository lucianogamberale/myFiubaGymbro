import { useState, useEffect } from "react";
// import { activitiesOptions } from "../components/ItemsList/ObjectiveActivityOptions";
import { UserObjectivesList } from "../components/ItemsList/UserObjectivesList";
import { UserObjectivesCharts } from "../components/Charts/UserObjectivesCharts";
import { useAuth } from '../auth/AuthProvider';

// import './Styles/user_exercise.css';
// import './Styles/BackButton.css';

// type FormData = {
//     Activity: string;
//     Objective: number;
// };


export const UserObjectives = () => {
    const [updateUserObjectives, setUpdateUserObjectives] = useState(false);
    const [history, setHistory] = useState([]);
    const auth = useAuth();
    const user_id = auth.getUserId();

    useEffect(() => {
        if (user_id) {
            fetch(`http://localhost:8000/api/user-objectives/${user_id}/history`)
                .then(res => res.json())
                .then(data => setHistory(data))
                .catch(() => setHistory([]));
        }
    }, [user_id, updateUserObjectives]);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen h-full w-full p-3">
            <div className=' w-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
                <UserObjectivesList updateUserObjectives={updateUserObjectives} onUpdateUserObjectives={setUpdateUserObjectives} />
                {history.length > 0 && <UserObjectivesCharts history={history} />}
            </div>
        </div>
    );
}