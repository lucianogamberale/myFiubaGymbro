export interface Exercise {
  day_of_week: string;
  time_of_day: string;
  exercise_name: string;
  exercise_category: string;
  duration: number;
  calories_burned: number;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

export const routines: Routine[] = [
  {
    id: "1",
    name: "Musculatura Nivel Inicial",
    description: "Rutina enfocada en principiantes para mejorar fuerza general y coordinación.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
      { day_of_week: "MONDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
      { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
      { day_of_week: "TUESDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
      { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
      { day_of_week: "WEDNESDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
      { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
      { day_of_week: "THURSDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
      { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
      { day_of_week: "FRIDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
      { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
      { day_of_week: "SATURDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
      { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
      { day_of_week: "SUNDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 }
    ]
  },
  {
    id: "2",
    name: "Musculatura Nivel Medio",
    description: "Entrenamiento intermedio con cargas progresivas y sesiones divididas por grupo muscular.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Pecho y tríceps (press banca, fondos)", exercise_category: "Fuerza", duration: 45, calories_burned: 568 },
      { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Espalda y bíceps (dominadas, remo)", exercise_category: "Fuerza", duration: 45, calories_burned: 568 },
      { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Piernas (sentadillas, peso muerto)", exercise_category: "Fuerza", duration: 45, calories_burned: 568 },
      { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Hombros y abdomen", exercise_category: "Fuerza", duration: 40, calories_burned: 568 },
      { day_of_week: "SUNDAY", time_of_day: "09:00:00", exercise_name: "Cardio y movilidad", exercise_category: "Cardio", duration: 30, calories_burned: 568 }
    ]
  },
  {
    id: "3",
    name: "Musculatura Nivel Alto",
    description: "Rutina avanzada con enfoque en hipertrofia y fuerza máxima.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
      { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
      { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
      { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
      { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
      { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
      { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 }
    ]
  },
  {
    id: "4",
    name: "Tonificación Corporal",
    description: "Ejercicios de bajo impacto para tonificar músculos y mejorar postura.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
      { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
      { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
      { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
      { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
      { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
      { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 }
    ]
  },
  {
    "id": "51",
    "name": "Running Nivel Inicial",
    "description": "Rutina para principiantes que desean iniciar en el running con caminatas y trotes suaves.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "07:30:00", "exercise_name": "Caminata rápida + trote suave (1:1)", "exercise_category": "Cardio", "duration": 30, "calories_burned": 250 },
      { "day_of_week": "TUESDAY", "time_of_day": "07:30:00", "exercise_name": "Caminata rápida", "exercise_category": "Cardio", "duration": 30, "calories_burned": 200 },
      { "day_of_week": "WEDNESDAY", "time_of_day": "07:30:00", "exercise_name": "Trote suave continuo", "exercise_category": "Cardio", "duration": 25, "calories_burned": 280 },
      { "day_of_week": "FRIDAY", "time_of_day": "07:30:00", "exercise_name": "Caminata rápida + trote suave (2:1)", "exercise_category": "Cardio", "duration": 35, "calories_burned": 300 },
      { "day_of_week": "SUNDAY", "time_of_day": "08:00:00", "exercise_name": "Trote suave en parque", "exercise_category": "Cardio", "duration": 30, "calories_burned": 320 }
    ]
  },
  {
    "id": "52",
    "name": "Running Nivel Medio",
    "description": "Rutina para corredores con experiencia básica que desean mejorar resistencia y ritmo.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "07:00:00", "exercise_name": "Trote continuo a ritmo moderado", "exercise_category": "Cardio", "duration": 40, "calories_burned": 420 },
      { "day_of_week": "TUESDAY", "time_of_day": "07:00:00", "exercise_name": "Series de velocidad: 4x400m", "exercise_category": "Cardio", "duration": 30, "calories_burned": 350 },
      { "day_of_week": "THURSDAY", "time_of_day": "07:00:00", "exercise_name": "Trote en cuestas", "exercise_category": "Cardio", "duration": 35, "calories_burned": 380 },
      { "day_of_week": "SATURDAY", "time_of_day": "08:00:00", "exercise_name": "Rodaje largo a ritmo cómodo", "exercise_category": "Cardio", "duration": 60, "calories_burned": 600 }
    ]
  },
  {
    "id": "53",
    "name": "Running Nivel Avanzado",
    "description": "Programa diseñado para corredores experimentados que buscan mejorar rendimiento competitivo.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "06:30:00", "exercise_name": "Rodaje regenerativo", "exercise_category": "Cardio", "duration": 45, "calories_burned": 400 },
      { "day_of_week": "TUESDAY", "time_of_day": "06:30:00", "exercise_name": "Series intensas: 6x800m", "exercise_category": "Cardio", "duration": 40, "calories_burned": 500 },
      { "day_of_week": "WEDNESDAY", "time_of_day": "06:30:00", "exercise_name": "Trote largo y suave", "exercise_category": "Cardio", "duration": 60, "calories_burned": 600 },
      { "day_of_week": "FRIDAY", "time_of_day": "06:30:00", "exercise_name": "Fartlek variado", "exercise_category": "Cardio", "duration": 45, "calories_burned": 550 },
      { "day_of_week": "SUNDAY", "time_of_day": "07:00:00", "exercise_name": "Rodaje largo progresivo", "exercise_category": "Cardio", "duration": 75, "calories_burned": 700 }
    ]
  },
  {
    "id": "54",
    "name": "Trail Running",
    "description": "Entrenamiento enfocado en resistencia, técnica de ascenso y descenso en terrenos irregulares.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "07:00:00", "exercise_name": "Trote en terreno mixto", "exercise_category": "Cardio", "duration": 45, "calories_burned": 500 },
      { "day_of_week": "WEDNESDAY", "time_of_day": "07:00:00", "exercise_name": "Subidas y bajadas técnicas", "exercise_category": "Cardio", "duration": 40, "calories_burned": 520 },
      { "day_of_week": "FRIDAY", "time_of_day": "07:00:00", "exercise_name": "Entrenamiento de cuestas", "exercise_category": "Cardio", "duration": 35, "calories_burned": 480 },
      { "day_of_week": "SATURDAY", "time_of_day": "08:00:00", "exercise_name": "Salida larga en sendero", "exercise_category": "Cardio", "duration": 90, "calories_burned": 850 }
    ]
  },
  {
    "id": "6",
    "name": "Ciclismo",
    "description": "Programa de ciclismo para mejorar resistencia aeróbica y fuerza en piernas.",
    "exercises": [
      { "day_of_week": "MONDAY", "time_of_day": "06:30:00", "exercise_name": "Rodaje suave en ruta", "exercise_category": "Cardio", "duration": 45, "calories_burned": 400 },
      { "day_of_week": "WEDNESDAY", "time_of_day": "06:30:00", "exercise_name": "Intervalos en subida", "exercise_category": "Cardio", "duration": 40, "calories_burned": 500 },
      { "day_of_week": "FRIDAY", "time_of_day": "06:30:00", "exercise_name": "Ciclismo indoor (spinning)", "exercise_category": "Cardio", "duration": 45, "calories_burned": 450 },
      { "day_of_week": "SUNDAY", "time_of_day": "07:00:00", "exercise_name": "Salida larga en ruta", "exercise_category": "Cardio", "duration": 90, "calories_burned": 800 }
    ]
  },
  {
    id: "7",
    name: "Natación",
    description: "Entrenamiento para técnica, resistencia y velocidad en piscina.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Técnica de crol y espalda", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
      { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Series de velocidad (25m, 50m)", exercise_category: "Cardio", duration: 40, calories_burned: 568 },
      { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Resistencia continua 1km", exercise_category: "Cardio", duration: 50, calories_burned: 568 }
    ]
  },
  {
    id: "8",
    name: "Boxeo",
    description: "Combinación de técnica, golpeo, sombra y acondicionamiento físico.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
      { day_of_week: "TUESDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
      { day_of_week: "WEDNESDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
      { day_of_week: "THURSDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
      { day_of_week: "FRIDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 }
    ]
  },
  {
    id: "9",
    name: "Entrenamiento Funcional",
    description: "Ejercicios multiarticulares y pliométricos para fuerza y resistencia.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "07:00:00", exercise_name: "Circuitos con peso corporal y kettlebells", exercise_category: "Fuerza", duration: 40, calories_burned: 568 },
      { day_of_week: "WEDNESDAY", time_of_day: "07:00:00", exercise_name: "Circuitos con peso corporal y kettlebells", exercise_category: "Fuerza", duration: 40, calories_burned: 568 },
      { day_of_week: "FRIDAY", time_of_day: "07:00:00", exercise_name: "Circuitos con peso corporal y kettlebells", exercise_category: "Fuerza", duration: 40, calories_burned: 568 }
    ]
  },
  {
    id: "11",
    name: "CrossFit",
    description: "Entrenamiento de alta intensidad con WODs variados.",
    exercises: [
      { day_of_week: "MONDAY", time_of_day: "06:00:00", exercise_name: "WOD: fuerza y cardio combinados", exercise_category: "Fuerza", duration: 45, calories_burned: 600 },
      { day_of_week: "WEDNESDAY", time_of_day: "06:00:00", exercise_name: "WOD: levantamiento olímpico y resistencia", exercise_category: "Fuerza", duration: 45, calories_burned: 600 },
      { day_of_week: "FRIDAY", time_of_day: "06:00:00", exercise_name: "WOD: circuito de alta intensidad", exercise_category: "Fuerza", duration: 45, calories_burned: 600 }
    ]
  }
];



// export interface Exercise {
//   day_of_week: string;
//   time_of_day: string;
//   exercise_name: string;
//   exercise_category: string;
//   duration: number;
//   calories_burned: number;
// }

// export interface Routine {
//   id: string;
//   name: string;
//   description: string;
//   exercises: Exercise[];
// }

// export const routines: Routine[] = [
//   {
//     id: "1",
//     name: "Musculatura Nivel Inicial",
//     description: "Rutina enfocada en principiantes para mejorar fuerza general y coordinación.",
//     exercises: [
//       { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
//       { day_of_week: "MONDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
//       { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
//       { day_of_week: "TUESDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
//       { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
//       { day_of_week: "WEDNESDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
//       { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
//       { day_of_week: "THURSDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
//       { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
//       { day_of_week: "FRIDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
//       { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
//       { day_of_week: "SATURDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20, calories_burned: 568 },
//       { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Circuito de cuerpo completo (sentadillas, flexiones de rodillas, planchas)", exercise_category: "Fuerza", duration: 30, calories_burned: 568 },
//       { day_of_week: "SUNDAY", time_of_day: "18:00:00", exercise_name: "Caminata ligera o bici fija", exercise_category: "Cardio", duration: 20 , calories_burned: 568 }
//     ]
//   }
//   // },
// //   {
// //     id: "2",
// //     name: "Musculatura Nivel Medio",
// //     description: "Entrenamiento intermedio con cargas progresivas y sesiones divididas por grupo muscular.",
// //     exercises: [
// //       { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Pecho y tríceps (press banca, fondos)", exercise_category: "Fuerza", duration: 45, calories_burned: 568 },
// //       { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Espalda y bíceps (dominadas, remo)", exercise_category: "Fuerza", duration: 45, calories_burned: 568 },
// //       { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Piernas (sentadillas, peso muerto)", exercise_category: "Fuerza", duration: 45, calories_burned: 568 },
// //       { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Hombros y abdomen", exercise_category: "Fuerza", duration: 40, calories_burned: 568 },
// //       { day_of_week: "SUNDAY", time_of_day: "09:00:00", exercise_name: "Cardio y movilidad", exercise_category: "Cardio", duration: 30 , calories_burned: 568 }
// //     ]
// //   },
// //     {
// //     id: "3",
// //     name: "Musculatura Nivel Alto",
// //     description: "Rutina avanzada con enfoque en hipertrofia y fuerza máxima.",
// //     exercises: [
// //       { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
// //       { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
// //       { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
// //       { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
// //       { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
// //       { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60, calories_burned: 568 },
// //       { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Entrenamiento por grupos musculares divididos", exercise_category: "Fuerza", duration: 60 , calories_burned: 568 }
// //     ]
// //   },
// //   {
// //     id: "4",
// //     name: "Tonificación Corporal",
// //     description: "Ejercicios de bajo impacto para tonificar músculos y mejorar postura.",
// //     exercises: [
// //       { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
// //       { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
// //       { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
// //       { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
// //       { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
// //       { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40, calories_burned: 568 },
// //       { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Pilates y ejercicios de resistencia con peso corporal", exercise_category: "Resistencia", duration: 40 , calories_burned: 568 }
// //     ]
// //   },
// //   {
// //     id: "5",
// //     name: "Running",
// //     description: "Programa de entrenamiento de carrera con enfoque en resistencia y técnica.",
// //     exercises: [
// //       { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Carrera continua 5km", exercise_category: "Cardio", duration: 30, calories_burned: 568 },
// //       { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Intervalos (400m rápidos / 400m trote)", exercise_category: "Cardio", duration: 35, calories_burned: 568 },
// //       { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Fartlek: cambios de ritmo", exercise_category: "Cardio", duration: 30, calories_burned: 568 },
// //       { day_of_week: "SUNDAY", time_of_day: "09:00:00", exercise_name: "Trote largo 10km", exercise_category: "Cardio", duration: 60 , calories_burned: 568 }
// //     ]
// //   },
// //   {
// //     id: "6",
// //     name: "Ciclismo",
// //     description: "Rutina semanal de ciclismo de ruta y urbano para mejorar capacidad aeróbica.",
// //     exercises: [
// //       { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Rodaje urbano 20km", exercise_category: "Cardio", duration: 60, calories_burned: 568 },
// //       { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Cuestas en bici (repeticiones)", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
// //       { day_of_week: "SATURDAY", time_of_day: "09:00:00", exercise_name: "Ruta larga 50km", exercise_category: "Cardio", duration: 120, calories_burned: 568  }
// //     ]
// //   },
// //   {
// //     id: "7",
// //     name: "Natación",
// //     description: "Entrenamiento para técnica, resistencia y velocidad en piscina.",
// //     exercises: [
// //       { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Técnica de crol y espalda", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
// //       { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Series de velocidad (25m, 50m)", exercise_category: "Cardio", duration: 40, calories_burned: 568 },
// //       { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Resistencia continua 1km", exercise_category: "Cardio", duration: 50 , calories_burned: 568 }
// //     ]
// //   },
// //   {
// //     id: "8",
// //     name: "Boxeo",
// //     description: "Combinación de técnica, golpeo, sombra y acondicionamiento físico.",
// //     exercises: [
// //       { day_of_week: "MONDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
// //       { day_of_week: "TUESDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
// //       { day_of_week: "WEDNESDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
// //       { day_of_week: "THURSDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
// //       { day_of_week: "FRIDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
// //       { day_of_week: "SATURDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45, calories_burned: 568 },
// //       { day_of_week: "SUNDAY", time_of_day: "18:00:00", exercise_name: "Sombra, saco, comba y abdominales", exercise_category: "Cardio", duration: 45 , calories_burned: 568 }
// //     ]
// //   },
// //   {
// //     id: "9",
// //     name: "CrossFit",
// //     description: "WODs funcionales con enfoque en fuerza, cardio y técnica bajo presión.",
// //     exercises: [
// //       { day_of_week: "MONDAY", time_of_day: "18:00:00", exercise_name: "WOD variado (EMOM, AMRAP, For Time)", exercise_category: "Fuerza/Cardio", duration: 50, calories_burned: 568 },
// //       { day_of_week: "TUESDAY", time_of_day: "18:00:00", exercise_name: "WOD variado (EMOM, AMRAP, For Time)", exercise_category: "Fuerza/Cardio", duration: 50, calories_burned: 568 },
// //       { day_of_week: "WEDNESDAY", time_of_day: "18:00:00", exercise_name: "WOD variado (EMOM, AMRAP, For Time)", exercise_category: "Fuerza/Cardio", duration: 50, calories_burned: 568 },
// //       { day_of_week: "THURSDAY", time_of_day: "18:00:00", exercise_name: "WOD variado (EMOM, AMRAP, For Time)", exercise_category: "Fuerza/Cardio", duration: 50, calories_burned: 568 },
// //       { day_of_week: "FRIDAY", time_of_day: "18:00:00", exercise_name: "WOD variado (EMOM, AMRAP, For Time)", exercise_category: "Fuerza/Cardio", duration: 50 , calories_burned: 568 }
// //     ]
// // },
// //   {
// //     id: "10",
// //     name: "Movilidad y flexibilidad",
// //     description: "Rutina diaria para mejorar movilidad articular y elasticidad muscular.",
// //     exercises: [
// //       { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Estiramientos dinámicos y estáticos", exercise_category: "Flexibilidad", duration: 30, calories_burned: 568 },
// //       { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Estiramientos dinámicos y estáticos", exercise_category: "Flexibilidad", duration: 30, calories_burned: 568 },
// //       { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Estiramientos dinámicos y estáticos", exercise_category: "Flexibilidad", duration: 30, calories_burned: 568 },
// //       { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Estiramientos dinámicos y estáticos", exercise_category: "Flexibilidad", duration: 30, calories_burned: 568 },
// //       { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Estiramientos dinámicos y estáticos", exercise_category: "Flexibilidad", duration: 30, calories_burned: 568 },
// //       { day_of_week: "SATURDAY", time_of_day: "08:00:00", exercise_name: "Estiramientos dinámicos y estáticos", exercise_category: "Flexibilidad", duration: 30, calories_burned: 568 },
// //       { day_of_week: "SUNDAY", time_of_day: "08:00:00", exercise_name: "Estiramientos dinámicos y estáticos", exercise_category: "Flexibilidad", duration: 30 , calories_burned: 568 }
// //     ]
// // },
// //   {
// //     id: "11",
// //     name: "Gimnasio General",
// //     description: "Plan estándar para quienes entrenan en gimnasio tradicional.",
// //     exercises: [
// //       { day_of_week: "MONDAY", time_of_day: "08:00:00", exercise_name: "Pecho y tríceps", exercise_category: "Fuerza", duration: 45, calories_burned: 568 },
// //       { day_of_week: "TUESDAY", time_of_day: "08:00:00", exercise_name: "Espalda y bíceps", exercise_category: "Fuerza", duration: 45, calories_burned: 568 },
// //       { day_of_week: "WEDNESDAY", time_of_day: "08:00:00", exercise_name: "Piernas", exercise_category: "Fuerza", duration: 50, calories_burned: 568 },
// //       { day_of_week: "THURSDAY", time_of_day: "08:00:00", exercise_name: "Cardio en cinta o elíptico", exercise_category: "Cardio", duration: 30, calories_burned: 568 },
// //       { day_of_week: "FRIDAY", time_of_day: "08:00:00", exercise_name: "Fullbody liviano + abdominales", exercise_category: "Fuerza", duration: 40, calories_burned: 568  }
// //     ]
// //   }
// ];
