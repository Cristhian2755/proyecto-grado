const { pool } = require('../config/db');

class Entrega {
  static async create(entregaData) {
    const { usuario_id, archivo, carpeta = null, version } = entregaData;
    const query = `
      INSERT INTO entregas (usuario_id, archivo, carpeta, version)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(query, [usuario_id, archivo, carpeta, version]);
    return result.rows[0];
  }

  static async getNextVersion(usuario_id, carpeta = null) {
    if (carpeta) {
      const query = 'SELECT COALESCE(MAX(version), 0) AS max_version FROM entregas WHERE usuario_id = $1 AND carpeta = $2';
      const result = await pool.query(query, [usuario_id, carpeta]);
      return Number(result.rows[0].max_version) + 1;
    }

    const query = 'SELECT COALESCE(MAX(version), 0) AS max_version FROM entregas WHERE usuario_id = $1';
    const result = await pool.query(query, [usuario_id]);
    return Number(result.rows[0].max_version) + 1;
  }

  static async findById(id) {
    const query = 'SELECT * FROM entregas WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByUsuario(usuario_id) {
    const query = `
      SELECT
        e.id,
        e.usuario_id,
        u.nombre AS usuario_nombre,
        u.email AS usuario_email,
        e.archivo,
        e.carpeta,
        e.version,
        e.fecha_subida AS fecha_entrega
      FROM entregas e
      LEFT JOIN usuarios u ON u.id = e.usuario_id
      WHERE e.usuario_id = $1
      ORDER BY e.fecha_subida DESC
    `;
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  }

  static async findByProyecto(proyecto_id) {
    // La tabla 'proyectos' fue eliminada; esta función ya no es aplicable.
    return [];
  }

  static async findByCarpeta(carpeta) {
    const likePattern = `docs/${carpeta}/%`;
    const query = `
      SELECT
        e.id,
        e.usuario_id,
        u.nombre AS usuario_nombre,
        u.email AS usuario_email,
        e.archivo,
        e.carpeta,
        e.version,
        e.fecha_subida AS fecha_entrega
      FROM entregas e
      LEFT JOIN usuarios u ON u.id = e.usuario_id
      WHERE e.archivo LIKE $1
      ORDER BY e.fecha_subida DESC
    `;
    const result = await pool.query(query, [likePattern]);
    return result.rows;
  }

  static async findByCarpetaPaged(carpeta, page = 1, limit = 20, usuarioId = null) {
    const offset = (page - 1) * limit;
    const likePattern = `docs/${carpeta}/%`;

    if (usuarioId) {
      const query = `
        SELECT
          e.id,
          e.usuario_id,
          u.nombre AS usuario_nombre,
          u.email AS usuario_email,
          e.archivo,
          e.carpeta,
          e.version,
          e.fecha_subida AS fecha_entrega
        FROM entregas e
        LEFT JOIN usuarios u ON u.id = e.usuario_id
        WHERE e.archivo LIKE $1 AND e.usuario_id = $2
        ORDER BY e.fecha_subida DESC
        LIMIT $3 OFFSET $4
      `;
      const result = await pool.query(query, [likePattern, usuarioId, limit, offset]);
      return result.rows;
    }

    const query = `
      SELECT
        e.id,
        e.usuario_id,
        u.nombre AS usuario_nombre,
        u.email AS usuario_email,
        e.archivo,
        e.carpeta,
        e.version,
        e.fecha_subida AS fecha_entrega
      FROM entregas e
      LEFT JOIN usuarios u ON u.id = e.usuario_id
      WHERE e.archivo LIKE $1
      ORDER BY e.fecha_subida DESC
      LIMIT $2 OFFSET $3
    `;
    const result = await pool.query(query, [likePattern, limit, offset]);
    return result.rows;
  }

  static async findAll() {
    const query = `
      SELECT
        e.id,
        e.usuario_id,
        u.nombre AS usuario_nombre,
        u.email AS usuario_email,
        e.archivo,
        e.carpeta,
        e.version,
        e.fecha_subida AS fecha_entrega
      FROM entregas e
      LEFT JOIN usuarios u ON u.id = e.usuario_id
      ORDER BY e.fecha_subida DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = Entrega;
