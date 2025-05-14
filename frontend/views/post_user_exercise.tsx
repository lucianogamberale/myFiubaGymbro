import { useForm } from 'react-hook-form';
import { exerciseOptions } from './Selects/exerciseOptions'; 
import { useNavigate } from 'react-router-dom';

import './user_exercise.css';
import './BackButton.css';

type FormData = {
  ID: number;
  Ejercicio: string;
  Duracion: number;
  Calorias: number;
  Date: string;
};

function UserExercise() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Esto te lleva a la vista anterior. Usá navigate('/') si querés ir al home.
  };

  const onSubmit = async (data: FormData) => {
    const userId = data.ID;  // El ID del usuario se toma desde el formulario
    const url = `http://localhost:8000/api/user-excercises/${userId}`; // Se usa en la URL

    // body del post
    const userExcerciseData = {
      excercise_name: data.Ejercicio,
      duration: data.Duracion,
      calories: data.Calorias,
      date_done: data.Date,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userExcerciseData),
      });

      if (!response.ok) throw new Error('Error al enviar los datos');

      const result = await response.json();
      console.log('Respuesta del servidor:', result);

      reset(); // Limpia el formulario
    } catch (error) {
      console.error('Error en el POST:', error);
    }
  };

  return (
    <div className="user-food-container">
      <button className="back-button" onClick={handleBack}>Volver</button>
      <h2 className="user-food-title">Registrar Ejercicio</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="user-exercise-form">
        <input
          placeholder="ID"
          type="number"
          {...register('ID', { required: true })}
        />
        <select {...register('Ejercicio', { required: true })}>
          <option value="">Selecciona la actividad realizada</option>
          {exerciseOptions.map((excercise) => (
            <option key={excercise} value={excercise}>
              {excercise}
            </option>
          ))}
        </select>
        <input
          placeholder="Duración"
          type="number"
          min={1}
          {...register('Duracion', { required: true,  min: 1 })}
        />
        <input
          placeholder="Calorías"
          type="number"
          min={1}
          {...register('Calorias', { required: true, min: 1 })}
        />
        <input type="date" {...register('Date', { required: true })} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default UserExercise;
