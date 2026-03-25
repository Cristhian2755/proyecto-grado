const pool = require("../config/db");

class Notificacion {
  static async findByUser(userId) {
    const result = await pool.query(
      "SELECT * FROM notificaciones WHERE usuario_id = $1 ORDER BY fecha DESC",
      [userId]
    );
    return result.rows;
  }

  static async create({ usuario_id, mensaje, leido = false }) {
    const result = await pool.query(
      `INSERT INTO notificaciones (usuario_id, mensaje, leido)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [usuario_id, mensaje, leido]
    );
    return result.rows[0];
  }

  static async update(id, { mensaje, leido }) {
    const result = await pool.query(
      `UPDATE notificaciones
       SET mensaje = $1, leido = $2
       WHERE id = $3
       RETURNING *`,
      [mensaje, leido, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id) {
    const result = await pool.query(
      "DELETE FROM notificaciones WHERE id = $1",
      [id]
    );
    return result.rowCount > 0;
  }
}

module.exports = Notificacion;
