import { useState } from "react";
import { UserDietsList } from "../components/ItemsList/UserDietsList";

export const UserDiets = () => {
  const [updateUserDiets, setUpdateUserDiets] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full w-full p-3">
      <div className=' w-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
        <UserDietsList updateUserDiets={updateUserDiets} onUpdateUserDiets={setUpdateUserDiets} />
      </div>
    </div>
  );
}
