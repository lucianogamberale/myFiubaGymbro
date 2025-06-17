import { useState, useEffect } from 'react';
import { UserExerciseCreateForm } from '../Forms/UserExerciseCreateForm';
import { UserExerciseEditForm } from '../Forms/UserExerciseEditForm';
import Loading from '../Loading';
import { useAuth } from '../../auth/AuthProvider';
import { ModalSuccess } from '../ModalSuccess';
import { ModalConfirm } from '../ModalConfirm';

interface Props {
    updateUserExercises: boolean;
    onUpdateUserExercises: (value: boolean) => void;
}

type UserExerciseEntry = {
    id: number;
    exercise_category: string;
    exercise_name: string;
    calories: number;
    date: string;
    duration: string;
};

export const UserExercisesList = ({ updateUserExercises, onUpdateUserExercises }: Props) => {
    const auth = useAuth();
    const userId = auth.getUserId();

    const [userExercises, setUserExersises] = useState<UserExerciseEntry[]>([])

    const [openCreateForm, setOpenCreateForm] = useState(false);

    const [openEditForm, setOpenEditForm] = useState(false);
    const [userExerciseIdToEdit, setUserExerciseIdToEdit] = useState<number | null>(null);

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const [userExerciseIdToDelete, setUserExerciseIdToDelete] = useState<number | null>(null);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ title: '', description: '' });

    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        fetch(`http://localhost:8000/api/user-exercises/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setUserExersises(data);
                setLoading(false);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        if (updateUserExercises || userId) {
            fetchData();
            onUpdateUserExercises(false);
        }
    }, [updateUserExercises, userId]);

    const handleEditUserExercise = (userExerciseId: number) => {
        setUserExerciseIdToEdit(userExerciseId);
        setOpenEditForm(true);
    };

    const handleFormSuccess = () => {
        setOpenCreateForm(false);
        setOpenEditForm(false);
        setUserExerciseIdToEdit(null);

        fetchData();
    }

    const handleUserExerciseCreateFormSuccess = () => {
        handleFormSuccess()
        setSuccessMessage({
            title: '¡Creado con éxito!',
            description: 'El ejercicio ha sido creado con éxito'
        });
        setShowSuccessModal(true);
    };

    const handleUserExerciseEditFormSuccess = () => {
        handleFormSuccess()
        setSuccessMessage({
            title: 'Editado con éxito!',
            description: 'El ejercicio ha sido editado con éxito'
        });
        setShowSuccessModal(true);
        onUpdateUserExercises(!updateUserExercises);
    };

    const confirmDeleteUserExercise = (userExerciseId: number) => {
        setUserExerciseIdToDelete(userExerciseId);
        setShowConfirmDeleteModal(true);
    };

    const executeDeleteUserExercise = () => {
        if (!userId || userExerciseIdToDelete === null) {
            console.error('Error: No se pudo eliminar el ejercicio. Usuario o ID de ejercicio no válido.');
            return;
        }

        setShowConfirmDeleteModal(false);
        setLoading(true);

        try {
            fetch(`http://localhost:8000/api/user-exercises/${userId}/exercises/${userExerciseIdToDelete}`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting user exercise:', error);
        } finally {
            setLoading(false);
            setUserExerciseIdToDelete(null);
        }

        onUpdateUserExercises(!updateUserExercises);
    };

    const cancelDeleteUserExercise = () => {
        setShowConfirmDeleteModal(false);
        setUserExerciseIdToDelete(null);
    };

    const handleCloseAll = () => {
        setShowSuccessModal(false);
        onUpdateUserExercises(!updateUserExercises);
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
                <span>Mis Ejercicios</span>
                <button onClick={() => setOpenCreateForm(true)} className="text-xl bg-slate-800 hover:bg-slate-600 py-2 px-8 rounded-full text-slate-100 font-semibold focus:outline-none">
                    + Cargar ejercicio
                </button>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            {<>
                {userExercises.length === 0 && !loading ? (
                    <div className="text-lg text-slate-400 text-center mt-3">Aún no cargaste nada.</div>
                ) : (
                    <div className="flex-grow overflow-auto">
                        <div className="grid grid-rows-* gap-4 p-2 ml-2 mr-2">
                            {<table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-sm bg-white">
                                <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
                                    <tr>
                                        <th className="px-4 py-3 text-left">Categoría</th>
                                        <th className="px-4 py-3 text-left">Nombre</th>
                                        <th className="">Duración [min]</th>
                                        <th className="px-4 py-3 text-right">Calorías quemadas [cal]</th>
                                        <th className="px-4 py-3 text-left">Fecha y hora</th>
                                        <th className='px-4 py-3 text-center'></th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-gray-200">
                                    {userExercises.map((userExercise) => (
                                        <tr key={userExercise.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2">{userExercise.exercise_category}</td>
                                            <td className="px-4 py-2">{userExercise.exercise_name}</td>
                                            <td className="px-4 py-2 text-right">{userExercise.duration}</td>
                                            <td className="px-4 py-2 text-right">{userExercise.calories}</td>
                                            <td className="px-4 py-2">
                                                {new Date(userExercise.date).toLocaleString('es-AR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleEditUserExercise(userExercise.id)}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-1 px-3 rounded text-xs mr-2"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => confirmDeleteUserExercise(userExercise.id)}
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
                <UserExerciseCreateForm
                    setOpenForm={setOpenCreateForm}
                    onNewUserExercise={handleUserExerciseCreateFormSuccess}
                ></UserExerciseCreateForm>}
            {openEditForm && userExerciseIdToEdit !== null &&
                <UserExerciseEditForm
                    userExerciseId={userExerciseIdToEdit}
                    setOpenForm={setOpenEditForm}
                    onEditUserExercise={handleUserExerciseEditFormSuccess}
                ></UserExerciseEditForm>}

            {showConfirmDeleteModal && (
                <ModalConfirm
                    title="Confirmar Eliminación"
                    description="¿Estás seguro de que quieres eliminar el ejercicio? Esta acción no se puede deshacer."
                    onConfirm={executeDeleteUserExercise}
                    onCancel={cancelDeleteUserExercise}
                />
            )}

            {showSuccessModal &&
                <ModalSuccess
                    title={successMessage.title}
                    description={successMessage.description}
                    route="/user-exercises"
                    button="Ir a mis ejercicios"
                    onClose={handleCloseAll}
                />
            }
        </div>
    );
};