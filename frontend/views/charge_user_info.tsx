import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';

import './Styles/BackButton.css';
// El usuario puede ingresar datos como peso, altura, edad, frecuencia cardíaca, etc.	

type FormData = {
  weight: string;
  height: string;
  age: string;
};

function ChargeUserInfo() {
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

    const url = `http://localhost:8000/api/user-health-data/${1}`; 

    // body del post
    const user = {
      weight: data.weight,
      height: data.height,
      age: data.age,
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

          if (['weight', 'height', 'age'].includes(errorData.field)) {
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
      setError('weight', { type: 'manual', message: 'Error al registrar los datos.' });
    }
  };

  return (
    <div className="user-food-container">
      {registroExitoso && (
        <p className="success-message">¡La informacion fue cargada con éxito!</p>
      )}
      <button className="back-button" onClick={handleBack}>Volver</button>
      <h2 className="user-food-title">Mis Datos</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="user-exercise-form">
          <input
            placeholder="Peso"
            type="number"
            className={errors.weight ? 'input-error' : ''}
            min={1}
            {...register('weight', {
              required: 'El peso es obligatorio', min: 1 
            })}
          />
          {errors.weight && <p className="error-message">{errors.weight.message}</p>}
          <input
            placeholder="Altura"
            type="number"
            className={errors.height ? 'input-error' : ''}
            {...register('height', {
              required: 'La altura es obligatoria',
            })}
          />
          {errors.height && <p className="error-message">{errors.height.message}</p>}
          <input
            placeholder="Edad"
            type="number"
            className={errors.age ? 'input-error' : ''}
            {...register('age', {
              required: 'La edad es obligatoria',
            })}
          />
        {errors.age && <p className="error-message">{errors.age.message}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ChargeUserInfo;
