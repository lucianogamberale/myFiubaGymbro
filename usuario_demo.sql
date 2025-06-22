INSERT INTO users (username, email, password, name, surname)
VALUES ('Gabriel', 'gabriel@gmail.com', '123', 'Gabriel', 'Perez');

-- Insertar 7 registros de peso
INSERT INTO user_health_data (user_id, weight, height, date)
VALUES
    (1, 95, 178, '2025-05-12'),
    (1, 93, 178, '2025-05-19'),
    (1, 91, 178, '2025-05-26'),
    (1, 91, 178, '2025-06-02'),
    (1, 90, 178, '2025-06-09'),
    (1, 88, 178, '2025-06-16'),
    (1, 86, 178, '2025-06-23');

-- Comidas
INSERT INTO foods (name, category)
VALUES 
    ('Ensalada', 'Vegetal'),
    ('Pollo', 'Proteína'),
    ('Tarta de espinaca', 'Vegetal'),
    ('Leche', 'Lácteo'),
    ('Manzana', 'Fruta'),
    ('Bife', 'Proteína');

-- Comidas consumidas
INSERT INTO user_foods (user_id, food_id, calories, date)
VALUES
    (1, 1, 20, '2025-06-19'), -- Ensalada
    (1, 2, 150, '2025-06-19'), -- Pollo
    (1, 3, 200, '2025-06-20'), -- Tarta de espinaca
    (1, 4, 30, '2025-06-21'), -- Leche
    (1, 5, 15, '2025-06-21'), -- Manzana
    (1, 1, 20, '2025-06-22'), -- Ensalada
    (1, 2, 150, '2025-06-22'), -- Pollo
    (1, 6, 300, '2025-06-23'); -- Bife

-- Ejercicios
INSERT INTO exercises (name, category)
VALUES
    ('Correr', 'Resistencia'),
    ('Flexiones', 'Fuerza'),
    ('Yoga', 'Flexibilidad');

-- Ejercicios realizados
INSERT INTO user_exercises (user_id, exercise_id, duration, calories, date)
VALUES
    (1, 1, 60, 100, '2025-06-18'), -- Correr
    (1, 2, 10, 120, '2025-06-20'), -- Flexiones
    (1, 1, 60, 100, '2025-06-22'), -- Correr
    (1, 3, 30, 50, '2025-06-22'); -- Yoga

-- Objetivos pasados (5 en total, 3 nuevos agregados)
INSERT INTO user_objective_history (user_id, activity, final_progress, objective, unit_of_measurement, start_date, end_date, completion_percentage, status, created_at)
VALUES
    (1, 'Perder peso', 2, 2, 'cal', '2025-05-12', '2025-05-19', 100, 'completed', NOW()),
    (1, 'Perder peso', 2, 2, 'cal', '2025-05-19', '2025-05-26', 100, 'completed', NOW()),
    (1, 'Perder peso', 0, 2, 'cal', '2025-05-26', '2025-06-02', 0, 'failed', NOW()),
    (1, 'Perder peso', 1, 2, 'cal', '2025-06-02', '2025-06-09', 50, 'failed', NOW()),
    (1, 'Perder peso', 1, 2, 'cal', '2025-06-09', '2025-06-16', 50, 'failed', NOW()),
    (1, 'Perder peso', 2, 2, 'cal', '2025-06-16', '2025-06-23', 100, 'completed', NOW());

-- Rutina 1
INSERT INTO routines (name, description, user_id)
VALUES
    ('Rutina Inicial', 'Rutina de ejercicios variados', 1);

INSERT INTO routine_exercises (day_of_week, time_of_day, exercise_name, exercise_category, duration, calories_burned, routine_id)
VALUES
    ('MONDAY', '08:00:00', 'Correr', 'Resistencia', 60, 100, 1),
    ('TUESDAY', '10:00:00', 'Flexiones', 'Fuerza', 10, 120, 1),
    ('WEDNESDAY', '08:00:00', 'Correr', 'Resistencia', 60, 100, 1),
    ('FRIDAY', '10:00:00', 'Flexiones', 'Fuerza', 10, 120, 1),
    ('SUNDAY', '08:00:00', 'Correr', 'Resistencia', 60, 100, 1),
    ('SUNDAY', '09:30:00', 'Yoga', 'Flexibilidad', 30, 50, 1);

-- Dieta 1
INSERT INTO diets (name, description, user_id)
VALUES
    ('Dieta Básica', 'Dieta Inicial', 1);

INSERT INTO diet_meals (day_of_week, time_of_day, food_name, food_category, calories, diet_id)
VALUES
    ('MONDAY', '08:00:00', 'Manzana', 'Fruta', 15, 1),
    ('MONDAY', '13:00:00', 'Pollo', 'Proteína', 150, 1),
    ('MONDAY', '21:00:00', 'Ensalada', 'Vegetal', 20, 1),
    ('WEDNESDAY', '08:00:00', 'Manzana', 'Fruta', 15, 1),
    ('WEDNESDAY', '13:00:00', 'Pollo', 'Proteína', 150, 1),
    ('WEDNESDAY', '21:00:00', 'Ensalada', 'Vegetal', 20, 1),
    ('FRIDAY', '08:00:00', 'Manzana', 'Fruta', 15, 1),
    ('FRIDAY', '13:00:00', 'Pollo', 'Proteína', 150, 1),
    ('FRIDAY', '21:00:00', 'Ensalada', 'Vegetal', 20, 1);
