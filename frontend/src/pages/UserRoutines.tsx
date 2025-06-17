import { useState } from "react";
import { UserRoutinesList } from "../components/ItemsList/UserRoutinesList"; // Assuming UserRoutinesList is in this path
import { UserExercisesList } from "../components/ItemsList/UserExercisesList";

export const UserRoutines = () => {
  const [updateUserRoutines, setUpdateUserRoutines] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full h-full p-3">
      <div className="h-full">
        <div className='w-full h-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
          <UserRoutinesList updateUserRoutines={updateUserRoutines} onUpdateUserRoutines={setUpdateUserRoutines} />
        </div>
      </div>
      <div className="pt-3 h-full">
        <div className='w-full h-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
          <UserExercisesList updateUserExercises={updateUserRoutines} onUpdateUserExercises={setUpdateUserRoutines} />
        </div>
      </div>
    </div>
  );
}