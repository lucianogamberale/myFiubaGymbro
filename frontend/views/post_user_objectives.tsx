import { useForm } from 'react-hook-form';
import { activitiesOptions } from './Selects/ObjectiveActivitiesOptions';
import { useNavigate } from 'react-router-dom';

import './Styles/user_exercise.css';
import './Styles/BackButton.css';

type FormData = {
  Activity: string;
  Objective: number;
};

function UserObjectives() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Esto te lleva a la vista anterior. Usá navigate('/') si querés ir al home.
  };

  const onSubmit = async (data: FormData) => {
    //const userId = data.ID;  // El ID del usuario se toma desde el formulario
    const url = `http://localhost:8000/api/user-objectives/${1}`; // Se usa en la URL

    // body del post
    const UserObjectivesData = {
      activity: data.Activity,
      objective: data.Objective,
      unit_of_measurement: "", //vacio porque se calcula en el back
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(UserObjectivesData),
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
      <h2 className="user-food-title">Registrar Activity</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="user-food-form">
        <select {...register('Activity', { required: true })}>
          <option value="">Selecciona una Activity</option>
          {activitiesOptions.map((activities) => (
            <option key={activities} value={activities}>
              {activities}
            </option>
          ))}
        </select>
        <input
          placeholder="Objective"
          type="number"
          min={1}
          {...register('Objective', { required: true, min: 1 })}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default UserObjectives;
