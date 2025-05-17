import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';

import './Styles/BackButton.css';

type FormData = {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
};

function Register() {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<FormData>();
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Esto te lleva a la vista anterior. Usá navigate('/') si querés ir al home.
  };

  useEffect(() => {
    if (registroExitoso) {
      const timer = setTimeout(() => setRegistroExitoso(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [registroExitoso]);

  const onSubmit = async (data: FormData) => {
    //const userId = data.ID;  // El ID del usuario se toma desde el formulario
    const url = `http://localhost:8000/api/register`; // Se usa en la URL

    // body del post
    const user = {
      name: data.name,
      surname: data.surname,
      username: data.username,
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        if (errorData?.field && errorData?.message) {
          // Si el campo recibido existe en el formulario, se asigna el error dinámicamente
          if (['name', 'surname', 'username', 'email', 'password'].includes(errorData.field)) {
            setError(errorData.field as keyof FormData, {
              type: 'manual',
              message: errorData.message,
            });
          } else {
            throw new Error('Campo no reconocido');
          }
        } else {
          throw new Error('Error genérico del servidor');
        }
      }
      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      reset(); // Limpia el formulario
      setRegistroExitoso(true);
    } catch (error) {
      console.error('Error en el POST:', error);
      // setError('mail', { type: 'manual', message: 'Error inesperado al registrar el usuario' });
      setError('email', { type: 'manual', message: 'Error al registrar el usuario. Es posible que este usuario ya exista.' });
    }
  };

  return (
    <div className="user-food-container">
      {registroExitoso && (
        <p className="success-message">¡Registro completado con éxito!</p>
      )}
      <button className="back-button" onClick={handleBack}>Volver</button>
      <h2 className="user-food-title">Crea tu cuenta!!</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="user-exercise-form">
          <input
            placeholder="Nombre"
            type="input"
            className={errors.name ? 'input-error' : ''}
            {...register('name', {
              required: 'El nombre es obligatoria',
            })}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
          <input
            placeholder="Apellido"
            type="input"
            className={errors.surname ? 'input-error' : ''}
            {...register('surname', {
              required: 'El apellido es obligatoria',
            })}
          />
          {errors.surname && <p className="error-message">{errors.surname.message}</p>}
          <input
            placeholder="Nombre de usuario"
            type="input"
            className={errors.username ? 'input-error' : ''}
            {...register('username', {
              required: 'El nombre de usuario es obligatoria',
            })}
          />
        {errors.username && <p className="error-message">{errors.username.message}</p>}
        <input
          placeholder="Email"
          type="email"
          className={errors.email ? 'input-error' : ''}
          {...register('email', {
            required: 'El email es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El formato del email no es válido',
            }
          })}
        />
        {errors.email && <p className="error-message">{errors.email.message}</p>}
        <input
          placeholder="Contraseña"
          type="password"
          className={errors.password ? 'input-error' : ''}
          {...register('password', {
            required: 'La contraseña es obligatoria',
          })}
        />
        {errors.password && <p className="error-message">{errors.password.message}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Register;
