import { useState } from "react";
import { UserDietsRecomendations } from "../components/ItemsList/UserDietRecommendationsList";

export const UserRecomendations = () => {
  const [updateDietRecomendations, setUpdateDietRecomendations] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen h-full w-full p-3">
      <div className='w-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
        <UserDietsRecomendations updateDietRecomendations={updateDietRecomendations} onUpdateDietRecomendations={setUpdateDietRecomendations} />
      </div>
    </div>
  );
}
