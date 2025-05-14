import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './user_food.css'; // cambiar
import './BackButton.css';

type ExcerciseEntry = {
  id: number;
  excercise_name: string;
  duration: number;
  calories: number;
  date_done: string;
};

function UserExcersiceFetcher() {
  const [userId, setUserId] = useState('');
  const [ExerciseList, setExerciseList] = useState<ExcerciseEntry[]>([]);
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
    setExerciseList([]);

    try {
      const response = await fetch(`http://localhost:8000/api/user-excercises/${userId}`);
      if (!response.ok) throw new Error('Error al obtener los datos');

      const data = await response.json();
      setExerciseList(data);
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

      {ExerciseList.length > 0 && (
        <div className="user-food-table-container">
          <h3>Comidas registradas</h3>
          <table className="user-food-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Duracion</th>
                <th>Calorías</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ExerciseList.map((excercise) => (
                <tr key={excercise.id}>
                  <td>{excercise.excercise_name}</td>
                  <td>{excercise.duration}</td>
                  <td>{excercise.calories}</td>
                  <td>{new Date(excercise.date_done).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && ExerciseList.length === 0 && (
        <p>No hay datos aún para este usuario.</p>
      )}
    </div>
  );
}

export default UserExcersiceFetcher;
