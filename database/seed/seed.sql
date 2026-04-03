-- Insertar roles
INSERT INTO roles (nombre) VALUES
('Coordinador'),
('Estudiante'),
('Asesor'),
('Jurado');

-- Insertar líneas temáticas
INSERT INTO lineas_tematicas (nombre) VALUES
('Ingeniería de Software'),
('Desarrollo Web'),
('Base de Datos'),
('Inteligencia Artificial'),
('Ciberseguridad');

-- Insertar usuarios
INSERT INTO usuarios (nombre, email, contrasena, rol_id) VALUES
('Admin ISER', 'admin@iser.edu.co', 'hashed_password', 1),
('Carlos Estudiante', 'carlos@iser.edu.co', 'hashed_password', 2),
('Maria Asesor', 'maria@iser.edu.co', 'hashed_password', 3),
('Juan Jurado', 'juan@iser.edu.co', 'hashed_password', 4);

-- Insertar proyectos
INSERT INTO proyectos (titulo, problema, justificacion, objetivos, estudiante_id, linea_tematica_id, estado) VALUES
('Sistema de Gestión de Proyectos', 
 'No existe un sistema centralizado para gestionar los proyectos de grado',
 'Es necesario optimizar el proceso de administración de proyectos académicos',
 'Crear una plataforma web para gestionar proyectos de grado de forma integral',
 2, 1, 'Propuesto');

-- Insertar revisiones
INSERT INTO revisiones (proyecto_id, revisor_id, comentario, aprobado) VALUES
(1, 3, 'Proyecto con buena fundamentación teórica', FALSE);

-- Insertar notificaciones
INSERT INTO notificaciones (usuario_id, mensaje, leido) VALUES
(2, 'Tu proyecto ha sido revisado', FALSE),
(3, 'Nuevo proyecto para revisar', FALSE);