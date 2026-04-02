-- Consultas para tabla proyectos

-- Obtener todos los proyectos
SELECT * FROM proyectos;

-- Obtener proyectos de un estudiante
SELECT * FROM proyectos WHERE estudiante_id = $1;

-- Obtener proyectos por estado
SELECT * FROM proyectos WHERE estado = $1;

-- Obtener proyectos con datos del estudiante
SELECT p.*, u.nombre as nombre_estudiante, u.email 
FROM proyectos p 
JOIN usuarios u ON p.estudiante_id = u.id;