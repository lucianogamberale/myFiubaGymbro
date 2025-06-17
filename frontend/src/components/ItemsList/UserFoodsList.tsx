import { useState, useEffect } from 'react';
import { UserFoodCreateForm } from '../Forms/UserFoodCreateForm';
import Loading from '../Loading';
import { useAuth } from '../../auth/AuthProvider';
import { ModalSuccess } from '../ModalSuccess';
import { ModalConfirm } from '../ModalConfirm';
import { UserFoodEditForm } from '../Forms/UserFoodEditForm';

interface Props {
    updateUserFoods: boolean;
    onUpdateUserFoods: (value: boolean) => void;
}

type UserFoodEntry = {
    id: number;
    food_name: string;
    food_category: string;
    calories: number;
    date: string;
};

export const UserFoodsList = ({ updateUserFoods, onUpdateUserFoods }: Props) => {
    const auth = useAuth();
    const userId = auth.getUserId();

    const [userFoods, setUserFoods] = useState<UserFoodEntry[]>([])

    const [openCreateForm, setOpenCreateForm] = useState(false);

    const [openEditForm, setOpenEditForm] = useState(false);
    const [userFoodIdToEdit, setUserFoodIdToEdit] = useState<number | null>(null);

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [userFoodIdToDelete, setUserFoodIdToDelete] = useState<number | null>(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetch(`http://localhost:8000/api/user-foods/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserFoods(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        if (updateUserFoods || userId) {
            fetchData();
            onUpdateUserFoods(false);
        }
    }, [updateUserFoods, userId,]);

    const handleEditUserFood = (userFoodId: number) => {
        setUserFoodIdToEdit(userFoodId);
        setOpenEditForm(true);
    };

    const handleFormSuccess = () => {
        setOpenCreateForm(false);
        setOpenEditForm(false);
        setUserFoodIdToEdit(null);

        fetchData();
    };

    const handleUserFoodCreateFormSuccess = () => {
        handleFormSuccess()
        setSuccessMessage({
            title: '¡Creado con éxito!',
            description: 'El ejercicio ha sido creado con éxito'
        });
        setShowSuccessModal(true);
    };

    const handleUserFoodEditFormSuccess = () => {
        handleFormSuccess()
        setSuccessMessage({
            title: 'Editado con éxito!',
            description: 'El ejercicio ha sido editado con éxito'
        });
        setShowSuccessModal(true);
        onUpdateUserFoods(!updateUserFoods);
    };

    const confirmDeleteUserFood = (userFoodId: number) => {
        setUserFoodIdToDelete(userFoodId);
        setShowConfirmDeleteModal(true);
    };

    const executeDeleteUserFood = () => {
        if (!userId || userFoodIdToDelete === null) {
            console.error('Error: No se pudo eliminar la comida. Usuario o ID de comida no válido.');
            return;
        }

        setShowConfirmDeleteModal(false);
        setLoading(true);

        try {
            fetch(`http://localhost:8000/api/user-foods/${userId}/foods/${userFoodIdToDelete}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting user Food:', error);
        } finally {
            setLoading(false);
            setUserFoodIdToDelete(null);
        }

        onUpdateUserFoods(!updateUserFoods);
    };

    const cancelDeleteUserFood = () => {
        setShowConfirmDeleteModal(false);
        setUserFoodIdToDelete(null);
    };

    const handleCloseAll = () => {
        setShowSuccessModal(false);
        onUpdateUserFoods(!updateUserFoods);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loading />
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col overflow-ayto">
            <div className="border-t border-gray-300 my-3"></div>
            <div className="text-3xl text-slate-900 ml-3 font-bold flex justify-between items-center">
                <span>Mis Comidas</span>
                <button onClick={() => setOpenCreateForm(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Cargar comida
                </button>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            {<>
                {userFoods.length === 0 && !loading ? (
                    <div className="text-lg text-slate-400 text-center mt-3">Aún no cargaste nada.</div>
                ) : (
                    <div className="flex-grow overflow-auto">
                        <div className="grid grid-rows-* gap-4 p-2 ml-2 mr-2">
                            {<table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                                <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Categoría</th>
                                        <th className="px-4 py-3 text-left">Nombre</th>
                                        <th className="px-4 py-3 text-right">Calorías ingeridas [cal]</th>
                                        <th className="px-4 py-3 text-left">Fecha y hora</th>
                                        <th className='px-4 py-3 text-center'></th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-200">
                                    {userFoods.map((userFood) => (
                                        <tr key={userFood.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2">{userFood.food_category}</td>
                                            <td className="px-4 py-2">{userFood.food_name}</td>
                                            <td className="px-4 py-2 text-right">{userFood.calories}</td>
                                            <td className="px-4 py-2">
                                                {new Date(userFood.date).toLocaleString('es-AR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleEditUserFood(userFood.id)}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => confirmDeleteUserFood(userFood.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs"
                                                >
                                                    Borrar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            }
                        </div>
                    </div>
                )}
            </>
            }

            {openCreateForm &&
                <UserFoodCreateForm
                    setOpenForm={setOpenCreateForm}
                    onNewUserFood={handleUserFoodCreateFormSuccess}
                ></UserFoodCreateForm>}
            {openEditForm && userFoodIdToEdit !== null &&
                <UserFoodEditForm
                    userFoodId={userFoodIdToEdit}
                    setOpenForm={setOpenEditForm}
                    onEditUserFood={handleUserFoodEditFormSuccess}
                ></UserFoodEditForm>}

            {showConfirmDeleteModal && (
                <ModalConfirm
                    title="Confirmar Eliminación"
                    description="¿Estás seguro de que quieres eliminar la comida? Esta acción no se puede deshacer."
                    onConfirm={executeDeleteUserFood}
                    onCancel={cancelDeleteUserFood}
                />
            )}

            {showSuccessModal &&
                <ModalSuccess
                    title={successMessage.title}
                    description={successMessage.description}
                    route="/user-foods"
                    button="Ir a mis comidas"
                    onClose={handleCloseAll}
                />
            }
        </div>
    );
};