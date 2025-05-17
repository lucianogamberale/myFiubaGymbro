import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/user_exercise.css'; // cambiar
import './Styles/BackButton.css';

type ExerciseEntry = {
  id: number;
  exercise_name: string;
  duration: number;
  calories: number;
  date_done: string;
};

function UserExersiceFetcher() {
  // const [userId, setUserId] = useState('');
  const userId = 1;
  const [ExerciseList, setExerciseList] = useState<ExerciseEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // o navigate('/') si querés ir al menú principal
  };

  const fetchExercises = async () => {
    if (!userId) return;

    setLoading(true);
    setError('');
    setExerciseList([]);

    try {
      const response = await fetch(`http://localhost:8000/api/user-exercises/${userId}`);
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

  useEffect(() => {
    fetchExercises();
  }, []);


  return (
    <div className="user-food-container">
      <button className="back-button" onClick={handleBack}>Volver</button>

      <h2 className="user-food-title">Consultar ejercicios</h2>

      {ExerciseList.length > 0 && (
        <div className="user-food-table-container">
          <h3>Ejercicios registrados</h3>
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
              {ExerciseList.map((exercise) => (
                <tr key={exercise.id}>
                  <td>{exercise.exercise_name}</td>
                  <td>{exercise.duration}</td>
                  <td>{exercise.calories}</td>
                  <td>{new Date(exercise.date_done).toLocaleDateString()}</td>
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

export default UserExersiceFetcher;
