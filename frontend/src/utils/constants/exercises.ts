import ejemplo from '../../images/routines/rutinas.jpg';

export interface Exercise {
  day_of_week: string;
  time_of_day: string;
  exercise_name: string;
  exercise_category: string;
  duration: number;
  calories_burned: number;
  image_url: string,
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

export const routines: Routine[] = [
  {
    id: "1.0",
    name: "Musculatura Nivel Inicial",
    description: "Rutina enfocada en principiantes para mejorar fuerza general y coordinación.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, planchas, flexiones)", exercise_category: "Fuerza", duration: 30, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "MONDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, planchas, flexiones)", exercise_category: "Fuerza", duration: 30, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "TUESDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, planchas, flexiones)", exercise_category: "Fuerza", duration: 30, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "WEDNESDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, planchas, flexiones)", exercise_category: "Fuerza", duration: 30, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "THURSDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, planchas, flexiones)", exercise_category: "Fuerza", duration: 30, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "FRIDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, planchas, flexiones)", exercise_category: "Fuerza", duration: 30, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "SATURDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, planchas, flexiones)", exercise_category: "Fuerza", duration: 30, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "SUNDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568, image_url: ejemplo }
    ]
  },
  {
    id: "1.1",
    name: "Musculatura Nivel Medio",
    description: "Entrenamiento intermedio con cargas progresivas y sesiones divididas por grupo muscular.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Pecho y tríceps (press banca, fondos)", exercise_category: "Fuerza", duration: 45, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Espalda y bíceps (dominadas, remo)", exercise_category: "Fuerza", duration: 45, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Piernas (sentadillas, peso muerto)", exercise_category: "Fuerza", duration: 45, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Hombros y abdomen", exercise_category: "Fuerza", duration: 40, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "SUNDAY", time_of_day: "09:00:00", exercise_name: "Cardio y movilidad", exercise_category: "Cardio", duration: 30, calories_burned: 568, image_url: ejemplo }
    ]
  },
  {
    id: "1.2",
    name: "Musculatura Nivel Alto",
    description: "Rutina avanzada con enfoque en hipertrofia y fuerza máxima.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568, image_url: ejemplo }
    ]
  },
  {
    id: "1.3",
    name: "Tonificación Corporal",
    description: "Ejercicios de bajo impacto para tonificar músculos y mejorar postura.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568, image_url: ejemplo },
      { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568, image_url: ejemplo }
    ]
  },
  {
    "id": "2.0",
    "name": "Running Nivel Inicial",
    "description": "Rutina para principiantes que desean iniciar en el running con caminatas y trotes suaves.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "07:30:00", "exercise_name": "Caminata rápida + trote suave (1:1)", "exercise_category": "Cardio", "duration": 30, "calories_burned": 250, image_url: ejemplo },
      { "day_of_week": "TUESDAY", "time_of_day": "07:30:00", "exercise_name": "Caminata rápida", "exercise_category": "Cardio", "duration": 30, "calories_burned": 200, image_url: ejemplo },
      { "day_of_week": "WEDNESDAY", "time_of_day": "07:30:00", "exercise_name": "Trote suave continuo", "exercise_category": "Cardio", "duration": 25, "calories_burned": 280, image_url: ejemplo },
      { "day_of_week": "FRIDAY", "time_of_day": "07:30:00", "exercise_name": "Caminata rápida + trote suave (2:1)", "exercise_category": "Cardio", "duration": 35, "calories_burned": 300, image_url: ejemplo },
      { "day_of_week": "SUNDAY", "time_of_day": "08:00:00", "exercise_name": "Trote suave en parque", "exercise_category": "Cardio", "duration": 30, "calories_burned": 320, image_url: ejemplo }
    ]
  },
  {
    "id": "2.1",
    "name": "Running Nivel Medio",
    "description": "Rutina para corredores con experiencia básica que desean mejorar resistencia y ritmo.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "07:00:00", "exercise_name": "Trote continuo a ritmo moderado", "exercise_category": "Cardio", "duration": 40, "calories_burned": 420, image_url: ejemplo },
      { "day_of_week": "TUESDAY", "time_of_day": "07:00:00", "exercise_name": "Series de velocidad: 4x400m", "exercise_category": "Cardio", "duration": 30, "calories_burned": 350, image_url: ejemplo },
      { "day_of_week": "THURSDAY", "time_of_day": "07:00:00", "exercise_name": "Trote en cuestas", "exercise_category": "Cardio", "duration": 35, "calories_burned": 380, image_url: ejemplo },
      { "day_of_week": "SATURDAY", "time_of_day": "08:00:00", "exercise_name": "Rodaje largo a ritmo cómodo", "exercise_category": "Cardio", "duration": 60, "calories_burned": 600, image_url: ejemplo }
    ]
  },
  {
    "id": "2.2",
    "name": "Running Nivel Avanzado",
    "description": "Programa diseñado para corredores experimentados que buscan mejorar rendimiento competitivo.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "06:30:00", "exercise_name": "Rodaje regenerativo", "exercise_category": "Cardio", "duration": 45, "calories_burned": 400, image_url: ejemplo },
      { "day_of_week": "TUESDAY", "time_of_day": "06:30:00", "exercise_name": "Series intensas: 6x800m", "exercise_category": "Cardio", "duration": 40, "calories_burned": 500, image_url: ejemplo },
      { "day_of_week": "WEDNESDAY", "time_of_day": "06:30:00", "exercise_name": "Trote largo y suave", "exercise_category": "Cardio", "duration": 60, "calories_burned": 600, image_url: ejemplo },
      { "day_of_week": "FRIDAY", "time_of_day": "06:30:00", "exercise_name": "Fartlek variado", "exercise_category": "Cardio", "duration": 45, "calories_burned": 550, image_url: ejemplo },
      { "day_of_week": "SUNDAY", "time_of_day": "07:00:00", "exercise_name": "Rodaje largo progresivo", "exercise_category": "Cardio", "duration": 75, "calories_burned": 700, image_url: ejemplo }
    ]
  },
  {
    "id": "2.3",
    "name": "Trail Running",
    "description": "Entrenamiento enfocado en resistencia, técnica de ascenso y descenso en terrenos irregulares.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "07:00:00", "exercise_name": "Trote en terreno mixto", "exercise_category": "Cardio", "duration": 45, "calories_burned": 500, image_url: ejemplo },
      { "day_of_week": "WEDNESDAY", "time_of_day": "07:00:00", "exercise_name": "Subidas y bajadas técnicas", "exercise_category": "Cardio", "duration": 40, "calories_burned": 520, image_url: ejemplo },
      { "day_of_week": "FRIDAY", "time_of_day": "07:00:00", "exercise_name": "Entrenamiento de cuestas", "exercise_category": "Cardio", "duration": 35, "calories_burned": 480, image_url: ejemplo },
      { "day_of_week": "SATURDAY", "time_of_day": "08:00:00", "exercise_name": "Salida larga en sendero", "exercise_category": "Cardio", "duration": 90, "calories_burned": 850, image_url: ejemplo }
    ]
  },
  {
    "id": "3.0",
    "name": "Yoga Nivel Inicial",
    "description": "Rutina suave para principiantes que buscan mejorar flexibilidad, respiración y conexión mente-cuerpo.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "08:00:00", "exercise_name": "Secuencia básica de Hatha Yoga", "exercise_category": "Flexibilidad", "duration": 30, "calories_burned": 120, image_url: ejemplo },
      { "day_of_week": "TUESDAY", "time_of_day": "08:00:00", "exercise_name": "Respiración y posturas de estiramiento", "exercise_category": "Relajación", "duration": 25, "calories_burned": 100, image_url: ejemplo },
      { "day_of_week": "THURSDAY", "time_of_day": "08:00:00", "exercise_name": "Saludos al sol y relajación guiada", "exercise_category": "Flexibilidad", "duration": 30, "calories_burned": 130, image_url: ejemplo },
      { "day_of_week": "SATURDAY", "time_of_day": "09:00:00", "exercise_name": "Yoga restaurativo con enfoque en espalda", "exercise_category": "Relajación", "duration": 35, "calories_burned": 110, image_url: ejemplo }
    ]
  },
  {
    "id": "3.1",
    "name": "Yoga Nivel Medio",
    "description": "Rutina intermedia para mejorar equilibrio, fuerza y fluidez entre posturas.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "07:30:00", "exercise_name": "Vinyasa Flow dinámico", "exercise_category": "Flexibilidad", "duration": 40, "calories_burned": 180, image_url: ejemplo },
      { "day_of_week": "WEDNESDAY", "time_of_day": "07:30:00", "exercise_name": "Posturas de equilibrio y respiración controlada", "exercise_category": "Fuerza", "duration": 35, "calories_burned": 160, image_url: ejemplo },
      { "day_of_week": "FRIDAY", "time_of_day": "07:30:00", "exercise_name": "Secuencia de apertura de caderas y torsiones", "exercise_category": "Flexibilidad", "duration": 40, "calories_burned": 170, image_url: ejemplo },
      { "day_of_week": "SUNDAY", "time_of_day": "08:30:00", "exercise_name": "Meditación guiada y pranayama", "exercise_category": "Relajación", "duration": 25, "calories_burned": 90, image_url: ejemplo }
    ]
  },
  {
    "id": "3.2",
    "name": "Yoga Nivel Avanzado",
    "description": "Desafío físico y mental con posturas avanzadas, control corporal y respiración profunda.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "07:00:00", "exercise_name": "Ashtanga Yoga Serie Primaria", "exercise_category": "Fuerza", "duration": 60, "calories_burned": 280, image_url: ejemplo },
      { "day_of_week": "TUESDAY", "time_of_day": "07:00:00", "exercise_name": "Posturas invertidas y equilibrio sobre brazos", "exercise_category": "Fuerza", "duration": 40, "calories_burned": 220, image_url: ejemplo },
      { "day_of_week": "THURSDAY", "time_of_day": "07:00:00", "exercise_name": "Power Yoga y apertura de pecho", "exercise_category": "Flexibilidad", "duration": 50, "calories_burned": 240, image_url: ejemplo },
      { "day_of_week": "SATURDAY", "time_of_day": "08:00:00", "exercise_name": "Meditación profunda y pranayama avanzado", "exercise_category": "Relajación", "duration": 30, "calories_burned": 100, image_url: ejemplo }
    ]
  },
  {
    "id": "3.3",
    "name": "Yoga Restaurativo",
    "description": "Programa centrado en la relajación profunda, con posturas pasivas sostenidas y respiración consciente. Ideal para combatir el estrés y mejorar el descanso.",
    "exercises": [
      { "day_of_week": "TUESDAY", "time_of_day": "20:00:00", "exercise_name": "Posturas pasivas con soporte (Savasana, Supta Baddha Konasana)", "exercise_category": "Relajación", "duration": 30, "calories_burned": 80, image_url: ejemplo },
      { "day_of_week": "THURSDAY", "time_of_day": "20:00:00", "exercise_name": "Yoga Nidra (meditación guiada)", "exercise_category": "Relajación", "duration": 35, "calories_burned": 70, image_url: ejemplo },
      { "day_of_week": "SATURDAY", "time_of_day": "09:00:00", "exercise_name": "Respiración profunda y estiramientos suaves", "exercise_category": "Relajación", "duration": 40, "calories_burned": 90, image_url: ejemplo },
      { "day_of_week": "SUNDAY", "time_of_day": "21:00:00", "exercise_name": "Secuencia de relajación para el sueño", "exercise_category": "Relajación", "duration": 25, "calories_burned": 60, image_url: ejemplo }
    ]
  }
];
