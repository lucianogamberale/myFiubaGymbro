import { useForm } from 'react-hook-form';
import { exerciseOptions } from './Selects/exerciseOptions'; 
import './user_exercise.css';
import './BackButton.css';
import { useNavigate } from 'react-router-dom';

type FormData = {
  ID: number;
  Ejercicio: string;
  duracion: number;
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
    const url = `http://localhost:8000/api/user-exercise/${userId}`; // Se usa en la URL

    // body del post
    const userFoodData = {
      ejercicio: data.Ejercicio,
      duracion: data.duracion,
      calorias: data.Calorias,
      date: data.Date,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userFoodData),
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
          placeholder="Duracion"
          type="number"
          min={1}
          {...register('duracion', { required: true,  min: 1 })}
        />
        <input
          placeholder="Calorías"
          type="number"
          min={1}
          {...register('Calorias', { required: true, min: 1 })}
        />
        <input type="datetime-local" {...register('Date', { required: true })} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default UserExercise;
