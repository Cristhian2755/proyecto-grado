-- Consultas para tabla usuarios

-- Obtener todos los usuarios
SELECT * FROM usuarios;

-- Obtener usuario por email
SELECT * FROM usuarios WHERE email = $1;

-- Obtener usuarios por rol
SELECT * FROM usuarios WHERE rol = $1;

-- Contar usuarios por rol
SELECT rol, COUNT(*) FROM usuarios GROUP BY rol;