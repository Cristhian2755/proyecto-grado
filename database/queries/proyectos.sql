-- database/queries/proyectos.sql

-- Listar proyectos con información del estudiante
SELECT p.*, u.nombre AS estudiante_nombre, u.email AS estudiante_email, u.rol AS estudiante_rol
FROM proyectos p
JOIN usuarios u ON u.id = p.estudiante_id
ORDER BY p.id;

-- Obtener un proyecto por su id
-- Params:  = id
SELECT p.*, u.nombre AS estudiante_nombre, u.email AS estudiante_email, u.rol AS estudiante_rol
FROM proyectos p
JOIN usuarios u ON u.id = p.estudiante_id
WHERE p.id = 
LIMIT 1;

-- Insertar proyecto
-- Params:  = titulo,  = problema,  = justificacion,  = objetivos,  = estudiante_id
INSERT INTO proyectos (titulo, problema, justificacion, objetivos, estudiante_id)
VALUES (, , , , )
RETURNING *;

-- Actualizar estado de proyecto
-- Params:  = estado,  = id
UPDATE proyectos
SET estado = 
WHERE id = 
RETURNING *;
