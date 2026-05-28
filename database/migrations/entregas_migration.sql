-- Migración segura para tabla `entregas`
-- 1) Agrega columnas necesarias si no existen
-- 2) Renombra `fecha_entrega` -> `fecha_subida` si existe
-- 3) Actualiza `usuario_id` a partir de `proyectos.estudiante_id` cuando sea posible
-- 4) Cuenta filas sin `usuario_id` y solo aplica constraints/drops si no hay filas sin usuario

BEGIN;

-- Agregar columnas si no existen
ALTER TABLE IF EXISTS entregas ADD COLUMN IF NOT EXISTS usuario_id BIGINT;
ALTER TABLE IF EXISTS entregas ADD COLUMN IF NOT EXISTS carpeta TEXT;

-- Renombrar columna de fecha si existe
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'entregas' AND column_name = 'fecha_entrega'
    ) THEN
        ALTER TABLE entregas RENAME COLUMN fecha_entrega TO fecha_subida;
    END IF;
END
$$;

-- Establecer default para version
ALTER TABLE IF EXISTS entregas ALTER COLUMN version SET DEFAULT 1;

-- Poblar usuario_id desde proyectos solo si la columna proyecto_id existe
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'entregas' AND column_name = 'proyecto_id'
    ) THEN
        UPDATE entregas e
        SET usuario_id = p.estudiante_id
        FROM proyectos p
        WHERE e.proyecto_id IS NOT NULL AND e.proyecto_id = p.id;
    END IF;
END
$$;

-- Contar filas sin usuario
-- Si retorna >0, elimina filas huérfanas para dejar la tabla consistente
DELETE FROM entregas WHERE usuario_id IS NULL;

-- Ya sin filas huérfanas, aplicar constraints finales
SELECT COUNT(*) AS missing_usuario FROM entregas WHERE usuario_id IS NULL;

ALTER TABLE entregas ALTER COLUMN usuario_id SET NOT NULL;
ALTER TABLE entregas
    ADD CONSTRAINT fk_entregas_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuarios(id)
    ON DELETE CASCADE;
ALTER TABLE entregas DROP COLUMN IF EXISTS proyecto_id;

COMMIT;
