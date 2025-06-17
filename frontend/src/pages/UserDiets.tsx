import { useState } from "react";
import { UserDietsList } from "../components/ItemsList/UserDietsList";
import { UserFoodsList } from "../components/ItemsList/UserFoodsList";

export const UserDiets = () => {
  const [updateUserDiets, setUpdateUserDiets] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full h-full p-3">
      <div className="h-full">
        <div className='w-full h-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
          <UserDietsList updateUserDiets={updateUserDiets} onUpdateUserDiets={setUpdateUserDiets} />
        </div>
      </div>
      <div className="pt-3 h-full">
        <div className='w-full h-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
          <UserFoodsList updateUserFoods={updateUserDiets} onUpdateUserFoods={setUpdateUserDiets} />
        </div>
      </div>
    </div>
  );
}
