const { pool } = require('../config/db');

class Project {
  static async create(projectData) {
    const { titulo, problema, justificacion, objetivos, estudiante_id, estado = 'propuesta' } = projectData;
    const query = `
      INSERT INTO proyectos (titulo, problema, justificacion, objetivos, estudiante_id, estado)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [titulo, problema, justificacion, objetivos, estudiante_id, estado];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM proyectos WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM proyectos';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findByEstudiante(estudiante_id) {
    const query = 'SELECT * FROM proyectos WHERE estudiante_id = $1';
    const result = await pool.query(query, [estudiante_id]);
    return result.rows;
  }

  static async update(id, updateData) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    Object.keys(updateData).forEach(key => {
      fields.push(`${key} = $${paramIndex}`);
      values.push(updateData[key]);
      paramIndex++;
    });

    const query = `UPDATE proyectos SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM proyectos WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}
