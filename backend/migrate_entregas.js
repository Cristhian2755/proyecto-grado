/* Script de migración ejecutable desde backend
   Uso: node migrate_entregas.js
   Lee variables de /home/azazel/Escritorio/proyecto-grado/.env
*/
const { Pool } = require('pg');
require('dotenv').config({ path: '/home/azazel/Escritorio/proyecto-grado/.env' });

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: String(process.env.PGSSL || '').toLowerCase() === 'true' ? { rejectUnauthorized: false } : false,
});

(async () => {
  const client = await pool.connect();
  try {
    console.log('Iniciando migración de entregas...');
    await client.query('BEGIN');

    const colRes = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name='entregas' AND column_name IN ('usuario_id','carpeta','fecha_entrega','fecha_subida','proyecto_id')");
    const cols = colRes.rows.map(r => r.column_name);
    console.log('Columnas detectadas:', cols.join(', '));

    if (!cols.includes('usuario_id')) {
      console.log('Agregando columna usuario_id...');
      await client.query('ALTER TABLE entregas ADD COLUMN usuario_id BIGINT');
    } else {
      console.log('Columna usuario_id ya existe.');
    }

    if (!cols.includes('carpeta')) {
      console.log('Agregando columna carpeta...');
      await client.query("ALTER TABLE entregas ADD COLUMN carpeta TEXT");
    } else {
      console.log('Columna carpeta ya existe.');
    }

    if (cols.includes('fecha_entrega') && !cols.includes('fecha_subida')) {
      console.log('Renombrando fecha_entrega -> fecha_subida...');
      await client.query('ALTER TABLE entregas RENAME COLUMN fecha_entrega TO fecha_subida');
    } else if (cols.includes('fecha_subida')) {
      console.log('Columna fecha_subida ya presente.');
    }

    console.log('Estableciendo default para version = 1');
    try {
      await client.query('ALTER TABLE entregas ALTER COLUMN version SET DEFAULT 1');
    } catch (e) {
      console.log('No se pudo establecer DEFAULT en version (tal vez columna no existe).', e.message);
    }

    const projExists = cols.includes('proyecto_id');

    if (projExists) {
      console.log('Populando usuario_id desde proyectos (si aplica)...');
      await client.query("UPDATE entregas e SET usuario_id = p.estudiante_id FROM proyectos p WHERE e.proyecto_id IS NOT NULL AND e.proyecto_id = p.id");
    } else {
      console.log('La columna proyecto_id ya no existe; se omite el mapeo desde proyectos.');
    }

    const missingRes = await client.query('SELECT COUNT(*)::int AS missing FROM entregas WHERE usuario_id IS NULL');
    const missing = missingRes.rows[0].missing;
    console.log('Filas sin usuario (usuario_id IS NULL):', missing);

    if (missing > 0) {
      console.log('Eliminando filas huérfanas para dejar la tabla consistente...');
      await client.query('DELETE FROM entregas WHERE usuario_id IS NULL');
    }

    console.log('Aplicando constraints finales y limpiando proyecto_id...');
    try {
      await client.query('ALTER TABLE entregas ALTER COLUMN usuario_id SET NOT NULL');
    } catch (e) {
      console.log('Warning: no se pudo setear NOT NULL en usuario_id:', e.message);
    }
    try {
      await client.query('ALTER TABLE entregas ADD CONSTRAINT fk_entregas_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE');
    } catch (e) {
      console.log('Warning: no se pudo añadir FK (quizá ya existe):', e.message);
    }
    if (projExists) {
      try {
        await client.query('ALTER TABLE entregas DROP COLUMN proyecto_id');
        console.log('Columna proyecto_id eliminada.');
      } catch (e) {
        console.log('Warning: no se pudo eliminar proyecto_id:', e.message);
      }
    }

    await client.query('COMMIT');
    console.log('Migración finalizada. Filas sin usuario:', missing);
    process.exit(0);
  } catch (err) {
    console.error('Error durante migración:', err.message || err);
    await client.query('ROLLBACK');
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
})();
