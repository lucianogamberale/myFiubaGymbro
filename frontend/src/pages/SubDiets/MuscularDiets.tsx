import { useState } from "react";
import { UserDietsMusculaturaList } from "../../components/ItemsList/Diets/MuscularDietsList";

export const UserDietsMusculatura = () => {
  const [updateUserMusculaturaDiets, setUpdateUserMusculaturaDiets] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full w-full p-3">
      <div className=' w-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
        <UserDietsMusculaturaList updateUserMusculaturaDiets={updateUserMusculaturaDiets} onUpdateUserMusculaturaDiets={setUpdateUserMusculaturaDiets} />
      </div>
    </div>
  );
}
