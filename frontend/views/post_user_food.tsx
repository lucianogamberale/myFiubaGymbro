import { useForm } from 'react-hook-form';
import { foodOptions } from './Selects/foodOptions'; 
import { foodCategories } from './Selects/foodCategories'; 
import { useNavigate } from 'react-router-dom';

import './Styles/user_excercise.css';
import './Styles/BackButton.css';

type FormData = {
  ID: number;
  Comida: string;
  Categoria: string;
  Calorias: number;
  Date: string;
};

function UserFood() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Esto te lleva a la vista anterior. Usá navigate('/') si querés ir al home.
  };

  const onSubmit = async (data: FormData) => {
    //const userId = data.ID;  // El ID del usuario se toma desde el formulario
    const url = `http://localhost:8000/api/user-foods/${1}`; // Se usa en la URL

    // body del post
    const userFoodData = {
      food_name: data.Comida,
      food_category: data.Categoria,
      calories: data.Calorias,
      date_eaten: data.Date,
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
      <h2 className="user-food-title">Registrar comida</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="user-food-form">
        {/* <input
          placeholder="ID"
          type="number"
          {...register('ID', { required: true })}
        /> */}
        <select {...register('Comida', { required: true })}>
          <option value="">Selecciona una comida</option>
          {foodOptions.map((food) => (
            <option key={food} value={food}>
              {food}
            </option>
          ))}
        </select>
        <select {...register('Categoria', { required: true })}>
          <option value="">Selecciona una categoria</option>
          {foodCategories.map((food) => (
            <option key={food} value={food}>
              {food}
            </option>
          ))}
        </select>
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

export default UserFood;

