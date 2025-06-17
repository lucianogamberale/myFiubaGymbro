import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { ModalSuccess } from '../components/ModalSuccess';

export default function SignUp() {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [errorResponse, setErrorResponse] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const auth = useAuth();

    async function signUpUser() {
        try {
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    surname,
                    username,
                    email,
                    password,
                }),
            });

            if (response.ok) {
                const userData = await response.json();
                auth.saveUser({
                    id: userData.id,
                    name: userData.name,
                    surname: userData.surname,
                    username: userData.username,
                    email: userData.email,
                    status: userData.status,
                });

                console.log("Registro exitoso");
                console.log("Auth: ", auth);
                setErrorResponse('');
                setShowSuccessModal(true);
            } else {
                const json = await response.json();
                setErrorResponse(json.message || "Error en el registro.");
            }
        } catch (error) {
            setErrorResponse("Error al registrse: el usuario y/o el email ya se encuentran en uso");
            console.error('Error al realizar la solicitud: ' + error);
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (password !== passwordConfirmation) {
            setErrorResponse("Las contraseñas no coinciden.");
            return;
        }
        signUpUser();
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
            <div className="w-full h-full flex flex-col justify-center items-center">
                <h1 className='text-4xl font-extrabold w-auto text-center'>
                    ¡Bienvenido a myFiubaGymbro!
                </h1>
                <p className='text-lg font-semibold w-auto text-center pb-4'>
                    La mejor manera de cuidar y organizar tu salud
                </p>
                <p className='text-lg font-semibold w-auto text-center'>
                    ¡Regístrate y comienza a cuidar tu salud!
                </p>
            </div>
            <div className="w-full h-full flex flex-col justify-center items-center bg-white p-6">
                <div className="flex justify-center">
                    <img width="80" height="80" src="https://img.icons8.com/external-soft-fill-juicy-fish/60/external-gym-gym-life-soft-fill-soft-fill-juicy-fish-10.png" alt="external-gym-gym-life-soft-fill-soft-fill-juicy-fish-10" />
                </div>
                <div className="text-center mt-6">
                    <h2 className='text-3xl font-bold text-gray-900'>
                        Creemos una cuenta
                    </h2>
                </div>
                <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                    {!!errorResponse && (
                        <div className='flex justify-center mb-3 bg-red-100'>
                            <p className="text-red-500 text-center">{errorResponse}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className=''>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Nombre
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='ej. Juan'
                                required
                                className="pl-3 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">
                                Apellido
                            </label>
                            <input
                                id="surname"
                                name="surname"
                                type="text"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder='ej. Perez'
                                required
                                className="pl-3 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Usuario
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='ej. jperez'
                                required
                                className="pl-3 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Correo Electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                placeholder='ej. jperez@fi.uba.ar'
                                required
                                className="pl-3 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                placeholder='********'
                                required
                                className="pl-3 mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <label htmlFor="passwordConfirmation" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirmar Contraseña
                            </label>
                            <input
                                id="passwordConfirmation"
                                name="passwordConfirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                autoComplete="current-password"
                                placeholder='********'
                                required
                                className="pl-3 mb-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                Registrarse
                            </button>
                        </div>
                    </form>
                    <p className="mt-1 text-center text-sm text-gray-500">
                        Ya tienes una cuenta?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Iniciar Sesión
                        </Link>
                    </p>
                </div>
            </div>
            {
                showSuccessModal &&
                <ModalSuccess title="¡Registro exitoso!" description="Tu cuenta ha sido creada con éxito." route="/login" button="Iniciar Sesión" />
            }
        </div >
    );
}