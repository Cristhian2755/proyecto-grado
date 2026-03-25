const pool = require("../config/db");

class Project {
  static async findAll() {
    const result = await pool.query(
      `SELECT p.*, u.nombre AS estudiante_nombre, u.email AS estudiante_email, u.rol AS estudiante_rol
       FROM proyectos p
       JOIN usuarios u ON u.id = p.estudiante_id
       ORDER BY p.id DESC`
    );
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT p.*, u.nombre AS estudiante_nombre, u.email AS estudiante_email, u.rol AS estudiante_rol
       FROM proyectos p
       JOIN usuarios u ON u.id = p.estudiante_id
       WHERE p.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  static async create({ titulo, problema, justificacion, objetivos, estudiante_id }) {
    const result = await pool.query(
      `INSERT INTO proyectos (titulo, problema, justificacion, objetivos, estudiante_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [titulo, problema, justificacion, objetivos, estudiante_id]
    );
    return result.rows[0];
  }

  static async update(id, { titulo, problema, justificacion, objetivos, estado }) {
    const result = await pool.query(
      `UPDATE proyectos
       SET titulo = $1, problema = $2, justificacion = $3, objetivos = $4, estado = $5
       WHERE id = $6
       RETURNING *`,
      [titulo, problema, justificacion, objetivos, estado, id]
    );
    return result.rows[0] || null;
  }

  static async delete(id) {
    const result = await pool.query(
      "DELETE FROM proyectos WHERE id = $1",
      [id]
    );
    return result.rowCount > 0;
  }
}

module.exports = Project;
