-- database/seed/seed.sql
-- Datos iniciales para la aplicación (puede ejecutarse con psql o una herramienta de migración).

-- Usuarios (contraseña hasheada usando bcrypt; reemplaza con tu propio hash si es necesario)
INSERT INTO usuarios (nombre, email, password, rol)
VALUES
  ('Administrador', 'admin@example.com', '', 'coordinador'),
  ('Estudiante Demo', 'estudiante@example.com', '', 'estudiante');

-- Lineas tematicas
INSERT INTO lineas_tematicas (nombre)
VALUES ('Inteligencia Artificial'),
       ('Sistemas Distribuidos');

-- Proyecto ejemplo (asignado al estudiante demo)
INSERT INTO proyectos (titulo, problema, justificacion, objetivos, estudiante_id)
VALUES ('Proyecto Demostración',
        'Descripción del problema...',
        'Justificación del proyecto de demostración',
        'Objetivo 1; Objetivo 2;',
        (SELECT id FROM usuarios WHERE email = 'estudiante@example.com'));
