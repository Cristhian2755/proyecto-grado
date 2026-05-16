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

-- Insertar carreras académicas
INSERT INTO carreras (nombre, facultad, coordinador_id) VALUES
('Tecnología en gestión de redes y sistemas', 'Tecnología', NULL),
('Tecnología en construcción de obras civiles', 'Tecnología', NULL),
('Tecnología en procesos agroindustriales', 'Tecnología', NULL),
('Tecnología en producción agropecuaria', 'Tecnología', NULL),
('Tecnología en gestión industrial', 'Tecnología', NULL),
('Tecnología en gestión comunitaria', 'Tecnología', NULL),
('Técnica profesional en seguridad y salud en el trabajo', 'Técnica profesional', NULL),
('Tecnología en gestión empresarial', 'Tecnología', NULL),
('Tecnología en gestión de mercadeo', 'Tecnología', NULL);

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