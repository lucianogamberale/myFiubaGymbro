import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/diet.css';
import './Styles/BackButton.css';

interface DietMealEntryResponse {
  id: number;
  day_of_week: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  time_of_day: string; // "HH:MM:SS"
  food_name: string;
  food_category: string;
  calories: number;
}

interface DietResponse {
  id: number;
  name: string;
  description?: string;
  user_id: number;
  meals: DietMealEntryResponse[];
}

type MealSchedule = {
  [day: string]: {
    [time: string]: DietMealEntryResponse[];
  };
};

const orderedDays: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[] = [
  "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"
];

const dayDisplayNames: { [key: string]: string } = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};


function MyDiets() {
  const [userDiets, setUserDiets] = useState<DietResponse[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<DietResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = 1;

  const fetchUserDiets = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/diets`);
      if (!response.ok) throw new Error('Error al obtener la lista de dietas.');
      const data: DietResponse[] = await response.json();
      setUserDiets(data);
    } catch (err: any) {
      console.error('Error fetching user diets:', err);
      setError(err.message || 'No se pudieron cargar las dietas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDiets();
  }, [userId]);

  const fetchDietDetails = async (dietId: number) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/diets/${dietId}`);
      if (!response.ok) throw new Error('Error al obtener los detalles de la dieta.');
      const data: DietResponse = await response.json();
      setSelectedDiet(data);
    } catch (err: any) {
      console.error('Error fetching diet details:', err);
      setError(err.message || 'No se pudo cargar el detalle de la dieta.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDiet = async (dietId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta dieta?')) {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}/diets/${dietId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          if (response.status !== 204) {
             const errorData = await response.json();
             throw new Error(errorData.detail || 'Error al eliminar la dieta.');
          }
        }

        alert('Dieta eliminada con éxito.');
        setSelectedDiet(null);
        fetchUserDiets();
      } catch (err: any) {
        console.error('Error deleting diet:', err);
        setError(err.message || 'No se pudo eliminar la dieta.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditDiet = (dietId: number) => {
    navigate(`/edit_diet/${dietId}`);
  };


  const getMealSchedule = (meals: DietMealEntryResponse[]): MealSchedule => {
    const schedule: MealSchedule = {};
    meals.forEach(meal => {
      const day = meal.day_of_week;
      const time = meal.time_of_day.substring(0, 5);

      if (!schedule[day]) {
        schedule[day] = {};
      }
      if (!schedule[day][time]) {
        schedule[day][time] = [];
      }
      schedule[day][time].push(meal);
    });
    return schedule;
  };

  const getUniqueTimes = (schedule: MealSchedule): string[] => {
    const allTimes = new Set<string>();
    orderedDays.forEach(day => {
      if (schedule[day]) {
        Object.keys(schedule[day]).forEach(time => allTimes.add(time));
      }
    });
    return Array.from(allTimes).sort((a, b) => {
      const [ha, ma] = a.split(':').map(Number);
      const [hb, mb] = b.split(':').map(Number);
      if (ha !== hb) return ha - hb;
      return ma - mb;
    });
  };

  const handleBackToList = () => {
    setSelectedDiet(null);
    setError('');
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="diet-container"><p>Cargando...</p></div>;
  if (error) return <div className="diet-container"><p className="error-message">{error}</p></div>;

  return (
    <div className="diet-container">
      <button className="back-button" onClick={handleBack}>Volver</button>
      <h2 className="diet-title">Mis Dietas</h2>

      {!selectedDiet ? (
        <div className="diet-list-container">
          {userDiets.length === 0 ? (
            <p>No tienes dietas creadas aún. ¡Crea una para empezar!</p>
          ) : (
            <>
              <h3>Selecciona una dieta:</h3>
              <ul className="diet-list">
                {userDiets.map(diet => (
                  <li key={diet.id} className="diet-list-item"> {}
                    <span onClick={() => fetchDietDetails(diet.id)} className="diet-name-link"> {}
                      {diet.name} {diet.description && `(${diet.description})`}
                    </span>
                    {}
                    <div className="diet-actions">
                        <button onClick={(e) => { e.stopPropagation(); handleEditDiet(diet.id); }} className="edit-diet-button">Editar</button>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteDiet(diet.id); }} className="delete-diet-button">Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : (
        <div className="diet-details-container">
          <button className="back-button" onClick={handleBackToList}>Volver a la lista</button>
          <h3>Dieta: {selectedDiet.name}</h3>
          {selectedDiet.description && <p>Descripción: {selectedDiet.description}</p>}

          {}
          <button onClick={() => handleEditDiet(selectedDiet.id)} className="edit-diet-button detail-view">Editar Dieta</button>


          <div className="diet-table-wrapper">
            <table className="diet-table">
              <thead>
                <tr>
                  <th>Hora</th>
                  {orderedDays.map(day => (
                    <th key={day}>{dayDisplayNames[day]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getUniqueTimes(getMealSchedule(selectedDiet.meals)).map(time => (
                  <tr key={time}>
                    <td>{time}</td>
                    {orderedDays.map(day => (
                      <td key={`${day}-${time}`}>
                        {getMealSchedule(selectedDiet.meals)[day]?.[time]?.map((meal, idx) => (
                          <div key={idx} className="meal-entry-cell">
                            <strong>{meal.food_name}</strong>
                            <br />
                            ({meal.calories} kcal)
                          </div>
                        ))}
                      </td>
                    ))}
                  </tr>
                ))}
                {getUniqueTimes(getMealSchedule(selectedDiet.meals)).length === 0 && (
                    <tr>
                        <td colSpan={orderedDays.length + 1}>No hay comidas registradas para esta dieta.</td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyDiets;
