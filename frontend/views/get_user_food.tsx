import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user_food.css';
import './BackButton.css';

type FoodEntry = {
  id: number;
  food_name: string;
  food_category: string;
  calories: number;
  date_eaten: string;
};

function UserFoodFetcher() {
  const [userId, setUserId] = useState('');
  const [foodList, setFoodList] = useState<FoodEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // o navigate('/') si querés ir al menú principal
  };

  const fetchFoods = async () => {
    if (!userId) return;

    setLoading(true);
    setError('');
    setFoodList([]);

    try {
      const response = await fetch(`http://localhost:8000/api/user-foods/${userId}`);
      if (!response.ok) throw new Error('Error al obtener los datos');

      const data = await response.json();
      setFoodList(data);
    } catch (err) {
      console.error(err);
      setError('No se pudo obtener la información del usuario.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-food-container">
      <button className="back-button" onClick={handleBack}>Volver</button>

      <h2 className="user-food-title">Consultar comidas por ID de usuario</h2>

      <form
        className="user-food-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchFoods();
        }}
      >
        <input
          type="number"
          placeholder="ID del usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {foodList.length > 0 && (
        <div className="user-food-table-container">
          <h3>Comidas registradas</h3>
          <table className="user-food-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Calorías</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {foodList.map((food) => (
                <tr key={food.id}>
                  <td>{food.food_name}</td>
                  <td>{food.food_category}</td>
                  <td>{food.calories}</td>
                  <td>{new Date(food.date_eaten).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && foodList.length === 0 && (
        <p>No hay datos aún para este usuario.</p>
      )}
    </div>
  );
}

export default UserFoodFetcher;
