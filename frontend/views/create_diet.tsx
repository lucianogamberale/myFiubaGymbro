import { useNavigate } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form'; // Importa useFieldArray
import './Styles/diet.css';
import './Styles/BackButton.css';
import { foodOptions } from './Selects/foodOptions'; // Asume que existe
import { foodCategories } from './Selects/foodCategories'; // Asume que existe

// Definiciones de tipos para los DTOs de frontend, alineados con el backend
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
  meals: DietMealEntryForm[]; // useFieldArray gestionará este array
}

const daysOfWeek: DayOfWeek[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

function CreateDiet() {
  const {
    control, // Necesitas 'control' para useFieldArray
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DietForm>({
    defaultValues: {
      name: '',
      description: '',
      meals: [], // Inicialmente vacío
    },
  });

  // Usa useFieldArray para gestionar el array 'meals'
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'meals', // El nombre del campo en tu formulario que es un array
  });

  const navigate = useNavigate();
  const userId = 1; // Asumiendo un userId fijo por ahora

  const handleAddMeal = () => {
    // Usa la función 'append' de useFieldArray para añadir una nueva entrada
    append({
      day_of_week: "MONDAY",
      time_of_day: "12:00",
      food_name: "",
      food_category: "",
      calories: 0,
    });
  };

  const handleRemoveMeal = (indexToRemove: number) => {
    // Usa la función 'remove' de useFieldArray para eliminar una entrada por índice
    remove(indexToRemove);
  };

  const onSubmit = async (data: DietForm) => { // 'data' ahora incluye el array 'meals' gestionado por useFieldArray
    const dietData = {
      name: data.name,
      description: data.description,
      meals: data.meals.map(meal => ({ // Usa data.meals directamente
        day_of_week: meal.day_of_week,
        time_of_day: meal.time_of_day + ":00", // Asegura el formato "HH:MM:SS"
        food_name: meal.food_name,
        food_category: meal.food_category,
        calories: Number(meal.calories), // Asegura que sea un número
      })),
    };

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}/diets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dietData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al crear la dieta');
      }

      const result = await response.json();
      console.log('Dieta creada con éxito:', result);
      alert('Dieta creada con éxito!');
      reset(); // Limpia el formulario completo, incluyendo el array 'meals'
    } catch (error: any) {
      console.error('Error al crear la dieta:', error.message);
      alert(`Error al crear la dieta: ${error.message}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="diet-container">
      <button className="back-button" onClick={handleBack}>Volver</button>
      <h2 className="diet-title">Crear Nueva Dieta Semanal</h2>

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
          {/* Itera sobre 'fields' proporcionado por useFieldArray */}
          {fields.map((field, index) => (
            <div key={field.id} className="diet-meal-entry"> {/* Usa field.id como key */}
              <h4>Comida #{index + 1}</h4>
              <label>
                Día de la semana:
                <Controller
                  name={`meals.${index}.day_of_week`}
                  control={control}
                  defaultValue={field.day_of_week} // Usa el valor por defecto del campo
                  rules={{ required: 'El día es obligatorio' }}
                  render={({ field: controllerField }) => ( // Renombra field para evitar conflicto
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
                  defaultValue={field.time_of_day} // Usa el valor por defecto del campo
                  rules={{
                    required: 'La hora es obligatoria',
                    pattern: {
                      value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                      message: 'Formato de hora inválido (HH:MM)'
                    }
                  }}
                  render={({ field: controllerField }) => ( // Renombra field
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
                  defaultValue={field.food_name} // Usa el valor por defecto del campo
                  rules={{ required: 'La comida es obligatoria' }}
                  render={({ field: controllerField }) => ( // Renombra field
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
                  defaultValue={field.food_category} // Usa el valor por defecto del campo
                  rules={{ required: 'La categoría es obligatoria' }}
                  render={({ field: controllerField }) => ( // Renombra field
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
                  defaultValue={field.calories} // Usa el valor por defecto del campo
                  rules={{ required: 'Las calorías son obligatorias', min: { value: 1, message: 'Debe ser al menos 1 caloría' } }}
                  render={({ field: controllerField }) => ( // Renombra field
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
          Guardar Dieta
        </button>
      </form>
    </div>
  );
}

export default CreateDiet;
