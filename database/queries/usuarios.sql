-- database/queries/usuarios.sql

-- Busca usuario por correo
-- Params:  = email
SELECT * FROM usuarios WHERE email =  LIMIT 1;

-- Inserta nuevo usuario
-- Params:  = nombre,  = email,  = password hash,  = rol
INSERT INTO usuarios (nombre, email, password, rol)
VALUES (, , , )
RETURNING *;

-- Actualiza datos del usuario
-- Params:  = nombre,  = email,  = rol,  = id
UPDATE usuarios
SET nombre = , email = , rol = 
WHERE id = 
RETURNING *;
