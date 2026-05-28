-- Eliminación de tablas relacionadas con proyectos
BEGIN;

DROP TABLE IF EXISTS revisiones CASCADE;
DROP TABLE IF EXISTS proyectos CASCADE;

COMMIT;
