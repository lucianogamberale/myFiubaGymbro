import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorResponse, setErrorResponse] = useState('');

    const auth = useAuth();

    console.log(auth);

    async function loginUser() {
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            if (response.ok) {
                console.log("Inicio exitoso");
                setErrorResponse('');

                const userData = await response.json();
                auth.saveUser({
                    id: userData.id,
                    name: userData.name,
                    surname: userData.surname,
                    username: userData.username,
                    email: userData.email,
                    status: userData.status,
                });
            } else {
                const json = await response.json();
                setErrorResponse(json.message || "Credenciales incorrectas.");
            }
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            setErrorResponse("Error al conectar con el servidor.");
        }
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        loginUser();
    }

    if (auth.isAuthenticated) {
        return <Navigate to="/user-health-data"></Navigate>;
    }

    return (
        <div className="h-screen w-screen flex flex-col md:flex-row overflow-hidden">
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center">
                <h1 className='text-4xl font-extrabold w-auto text-center'>
                    ¡Bienvenido a myFiubaGymbro!
                </h1>
                <p className='text-lg font-semibold w-auto text-center'>
                    La mejor manera de cuidar y organizar tu salud
                </p>
                <div className="text-center mt-6">
                    <h2 className='text-2xl font-bold text-gray-900'>
                        Inicie sesión con email
                    </h2>
                </div>
                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    {!!errorResponse && (
                        <div className='flex justify-center mb-3 bg-red-100'>
                            <p className="text-red-500 text-center">{errorResponse}</p>
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Correo Electrónico
                            </label>
                            <div className="">
                                <input
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='ej. jperez@fi.uba.ar'
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Contraseña
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                                        Olvidó su contraseña?
                                    </a>
                                </div>
                            </div>
                            <div className="">
                                <input
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    placeholder='********'
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type='submit'
                            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <p className="mt-1 text-center text-sm text-gray-500">
                        Aún no tienes una cuenta?{' '}
                        <Link to="/" className="font-semibold leading-6 text-blue-600 hover:text-blue-500">
                            Registrarse
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}