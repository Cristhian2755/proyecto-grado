const { pool } = require('../config/db');

class Notificacion {
  static async create(usuarioData) {
    const { usuario_id, mensaje } = usuarioData;
    const query = `
      INSERT INTO notificaciones (usuario_id, mensaje)
      VALUES ($1, $2)
      RETURNING *
    `;
    const result = await pool.query(query, [usuario_id, mensaje]);
    return result.rows[0];
  }

  static async findByUsuario(usuario_id) {
    const query = `
      SELECT * FROM notificaciones 
      WHERE usuario_id = $1 
      ORDER BY fecha DESC
    `;
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  }

  static async markAsRead(id) {
    const query = 'UPDATE notificaciones SET leido = TRUE WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findUnread(usuario_id) {
    const query = `
      SELECT * FROM notificaciones 
      WHERE usuario_id = $1 AND leido = FALSE
      ORDER BY fecha DESC
    `;
    const result = await pool.query(query, [usuario_id]);
    return result.rows;
  }
}

module.exports = Notificacion;
