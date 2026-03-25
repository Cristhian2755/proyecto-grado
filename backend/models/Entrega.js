const pool = require("../config/db");

class Entrega {
  static async findByProject(projectId) {
    const result = await pool.query(
      "SELECT * FROM entregas WHERE proyecto_id = $1 ORDER BY fecha_entrega DESC",
      [projectId]
    );
    return result.rows;
  }

  static async create({ proyecto_id, estudiante_id, descripcion, archivo_url }) {
    const result = await pool.query(
      `INSERT INTO entregas (proyecto_id, estudiante_id, descripcion, archivo_url)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [proyecto_id, estudiante_id, descripcion, archivo_url]
    );
    return result.rows[0];
  }

  static async update(id, { descripcion, archivo_url }) {
    const result = await pool.query(
      `UPDATE entregas
       SET descripcion = $1, archivo_url = $2
       WHERE id = $3
       RETURNING *`,
      [descripcion, archivo_url, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id) {
    const result = await pool.query(
      "DELETE FROM entregas WHERE id = $1",
      [id]
    );
    return result.rowCount > 0;
  }
}

module.exports = Entrega;
