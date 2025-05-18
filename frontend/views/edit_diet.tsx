import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importa useParams
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import './Styles/diet.css';
import './Styles/BackButton.css';
import { foodOptions } from './Selects/foodOptions';
import { foodCategories } from './Selects/foodCategories';

// Definiciones de tipos (igual que en create_diet.tsx)
type DayOfWeek = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

interface DietMealEntryForm {
  day_of_week: DayOfWeek;
  time_of_day: string; // Formato "HH:MM" o "HH:MM:SS"
  food_name: string;
  food_category: string;
  calories: number;
}

interface DietForm {
  name: string;
  description?: string;
  meals: DietMealEntryForm[];
}

const daysOfWeek: DayOfWeek[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

function EditDiet() {
  const { dietId } = useParams<{ dietId: string }>(); // Obtiene el ID de la dieta de la URL
  const navigate = useNavigate();
  const userId = 1; // Asumiendo un userId fijo

  const {
    control,
    register,
    handleSubmit,
    reset, // reset es suficiente para cargar los datos iniciales con defaultValues
    formState: { errors },
    // Eliminamos 'setValue' de aquí ya que no se usa directamente
  } = useForm<DietForm>({
    defaultValues: {
      name: '',
      description: '',
      meals: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meals',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar los datos de la dieta al iniciar el componente
  useEffect(() => {
    const fetchDietDetails = async () => {
      if (!dietId) {
        setError('ID de dieta no proporcionado.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}/diets/${dietId}`);
        if (!response.ok) throw new Error('Error al obtener los detalles de la dieta para edición.');
        const data = await response.json();

        // Cargar los datos obtenidos en el formulario usando reset
        reset({
          name: data.name,
          description: data.description,
          meals: data.meals.map((meal: any) => ({
            day_of_week: meal.day_of_week,
            time_of_day: meal.time_of_day.substring(0, 5), // Formato HH:MM para el input type="time"
            food_name: meal.food_name,
            food_category: meal.food_category,
            calories: meal.calories,
          })),
        });

      } catch (err: any) {
        console.error('Error fetching diet details for edit:', err);
        setError(err.message || 'No se pudieron cargar los detalles de la dieta para edición.');
      } finally {
        setLoading(false);
      }
    };

    fetchDietDetails();
  }, [dietId, userId, reset]); // Dependencias del useEffect

  const handleAddMeal = () => {
    append({
      day_of_week: "MONDAY",
      time_of_day: "12:00",
      food_name: "",
      food_category: "",
      calories: 0,
    });
  };

  const handleRemoveMeal = (indexToRemove: number) => {
    remove(indexToRemove);
  };

  const onSubmit = async (data: DietForm) => {
    if (!dietId) return; // No hacer nada si no hay ID de dieta

    const dietData = {
      name: data.name,
      description: data.description,
      meals: data.meals.map(meal => ({
        day_of_week: meal.day_of_week,
        time_of_day: meal.time_of_day + ":00",
        food_name: meal.food_name,
        food_category: meal.food_category,
        calories: Number(meal.calories),
      })),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/diets/${dietId}`, {
        method: 'PUT', // Usar método PUT para actualizar
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dietData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al actualizar la dieta');
      }

      const result = await response.json();
      console.log('Dieta actualizada con éxito:', result);
      alert('Dieta actualizada con éxito!');
      navigate('/my_diets'); // Redirige a la lista de dietas después de actualizar
    } catch (error: any) {
      console.error('Error al actualizar la dieta:', error.message);
      alert(`Error al actualizar la dieta: ${error.message}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="diet-container"><p>Cargando...</p></div>;
  if (error) return <div className="diet-container"><p className="error-message">{error}</p></div>;

  return (
    <div className="diet-container">
      <button className="back-button" onClick={handleBack}>Volver</button>
      <h2 className="diet-title">Editar Dieta</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="diet-form">
        <label>
          Nombre de la Dieta:
          <input
            type="text"
            {...register('name', { required: 'El nombre es obligatorio' })}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </label>

        <label>
          Descripción (opcional):
          <textarea {...register('description')}></textarea>
        </label>

        <h3>Comidas de la Dieta</h3>
        <div className="diet-meals-list">
          {fields.map((field, index) => (
            <div key={field.id} className="diet-meal-entry">
              <h4>Comida #{index + 1}</h4>
              <label>
                Día de la semana:
                <Controller
                  name={`meals.${index}.day_of_week`}
                  control={control}
                  defaultValue={field.day_of_week}
                  rules={{ required: 'El día es obligatorio' }}
                  render={({ field: controllerField }) => (
                    <select {...controllerField} className={errors.meals?.[index]?.day_of_week ? 'input-error' : ''}>
                      {daysOfWeek.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  )}
                />
                 {errors.meals?.[index]?.day_of_week && <span className="error-message">{errors.meals[index].day_of_week?.message}</span>}
              </label>

              <label>
                Hora (HH:MM):
                <Controller
                  name={`meals.${index}.time_of_day`}
                  control={control}
                  defaultValue={field.time_of_day}
                  rules={{
                    required: 'La hora es obligatoria',
                    pattern: {
                      value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                      message: 'Formato de hora inválido (HH:MM)'
                    }
                  }}
                  render={({ field: controllerField }) => (
                    <input
                      type="time"
                      {...controllerField}
                      className={errors.meals?.[index]?.time_of_day ? 'input-error' : ''}
                    />
                  )}
                />
                 {errors.meals?.[index]?.time_of_day && <span className="error-message">{errors.meals[index].time_of_day?.message}</span>}
              </label>

              <label>
                Comida:
                <Controller
                  name={`meals.${index}.food_name`}
                  control={control}
                  defaultValue={field.food_name}
                  rules={{ required: 'La comida es obligatoria' }}
                  render={({ field: controllerField }) => (
                    <select {...controllerField} className={errors.meals?.[index]?.food_name ? 'input-error' : ''}>
                      <option value="">Selecciona una comida</option>
                      {foodOptions.map((food) => (
                        <option key={food} value={food}>{food}</option>
                      ))}
                    </select>
                  )}
                />
                 {errors.meals?.[index]?.food_name && <span className="error-message">{errors.meals[index].food_name?.message}</span>}
              </label>

              <label>
                Categoría:
                <Controller
                  name={`meals.${index}.food_category`}
                  control={control}
                  defaultValue={field.food_category}
                  rules={{ required: 'La categoría es obligatoria' }}
                  render={({ field: controllerField }) => (
                    <select {...controllerField} className={errors.meals?.[index]?.food_category ? 'input-error' : ''}>
                      <option value="">Selecciona una categoría</option>
                      {foodCategories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  )}
                />
                {errors.meals?.[index]?.food_category && <span className="error-message">{errors.meals[index].food_category?.message}</span>}
              </label>

              <label>
                Calorías:
                <Controller
                  name={`meals.${index}.calories`}
                  control={control}
                  defaultValue={field.calories}
                  rules={{ required: 'Las calorías son obligatorias', min: { value: 1, message: 'Debe ser al menos 1 caloría' } }}
                  render={({ field: controllerField }) => (
                    <input
                      type="number"
                      min={1}
                      {...controllerField}
                      onChange={e => controllerField.onChange(Number(e.target.value))}
                      className={errors.meals?.[index]?.calories ? 'input-error' : ''}
                    />
                  )}
                />
                {errors.meals?.[index]?.calories && <span className="error-message">{errors.meals[index].calories?.message}</span>}
              </label>
              <button type="button" onClick={() => handleRemoveMeal(index)} className="remove-meal-button">
                Eliminar Comida
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={handleAddMeal} className="add-meal-button">
          Añadir Comida
        </button>

        <button type="submit" className="submit-diet-button">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditDiet;
