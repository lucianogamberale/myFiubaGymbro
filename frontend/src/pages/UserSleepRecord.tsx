import { useState } from "react";
import { UserSleepRecordsList } from "../components/ItemsList/UserSleepRecordList";

export const UserSleepRecord = () => {
    const [updateUserSleepRecords, setUpdateUserSleepRecords] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen h-full w-full p-3">
            <div className='xl:w-3/4 lg:w-2/3 w-full flex flex-col bg-white rounded-2xl lg:ml-0 lg:mr-2 lg:mb-0 mb-2 p-5 relative border-slate-800 border'>
                <UserSleepRecordsList updateUserSleepRecords={updateUserSleepRecords} onUpdateUserSleepRecords={setUpdateUserSleepRecords} />
            </div>
        </div>
    );
}
