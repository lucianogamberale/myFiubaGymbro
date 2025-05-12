import { useForm } from 'react-hook-form';
import { foodOptions } from './Selects/foodOptions'; 
import { foodCategories } from './Selects/foodCategories'; 
import './user_food.css';

type FormData = {
  ID: number;
  Comida: string;
  Categoria: string;
  Calorias: number;
  Date: string;
};

function UserFood() {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const userId = data.ID;  // El ID del usuario se toma desde el formulario
    const url = `http://localhost:8000/api/user-foods/${userId}`; // Se usa en la URL

    // body del post
    const userFoodData = {
      comida: data.Comida,
      categoria: data.Categoria,
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
      <h2 className="user-food-title">Registrar comida</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="user-food-form">
        <input
          placeholder="ID"
          type="number"
          {...register('ID', { required: true })}
        />
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
          {...register('Calorias', { required: true })}
        />
        <input type="date" {...register('Date', { required: true })} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default UserFood;

