import { useState } from "react";
import { UserExerciseRecomendationList } from "../components/ItemsList/UserRoutineRecommendationsList";

export const ExerciseRecomendation = () => {
    const [updateUserExerciseRecomendation, setUpdateUserExerciseRecomendation] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen h-full w-full p-3">
            <div className='xl:w-3/4 lg:w-2/3 w-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
                <UserExerciseRecomendationList updateUserExerciseRecomendation={updateUserExerciseRecomendation} onUpdateUserExerciseRecomendation={setUpdateUserExerciseRecomendation} />
            </div>
        </div>
    );
}
