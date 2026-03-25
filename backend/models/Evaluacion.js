const pool = require("../config/db");

class Evaluacion {
  static async findByProject(projectId) {
    const result = await pool.query(
      "SELECT * FROM evaluaciones WHERE proyecto_id = $1 ORDER BY fecha_evaluacion DESC",
      [projectId]
    );
    return result.rows;
  }

  static async create({ proyecto_id, evaluador_id, comentario, aprobado }) {
    const result = await pool.query(
      `INSERT INTO evaluaciones (proyecto_id, evaluador_id, comentario, aprobado)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [proyecto_id, evaluador_id, comentario, aprobado]
    );
    return result.rows[0];
  }

  static async update(id, { comentario, aprobado }) {
    const result = await pool.query(
      `UPDATE evaluaciones
       SET comentario = $1, aprobado = $2
       WHERE id = $3
       RETURNING *`,
      [comentario, aprobado, id]
    );
    return result.rows[0] || null;
  }
}

module.exports = Evaluacion;
