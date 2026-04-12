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
    const query = `
      SELECT 
        p.*,
        u.nombre as estudiante_nombre,
        u.email as estudiante_email,
        r.nombre as rol,
        lt.nombre as linea_tematica
      FROM proyectos p
      LEFT JOIN usuarios u ON p.estudiante_id = u.id
      LEFT JOIN roles r ON u.rol_id = r.id
      LEFT JOIN lineas_tematicas lt ON p.linea_tematica_id = lt.id
      ORDER BY p.id DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findByEstudiante(estudiante_id) {
    const query = `
      SELECT 
        p.*,
        u.nombre as estudiante_nombre,
        u.email as estudiante_email,
        lt.nombre as linea_tematica
      FROM proyectos p
      LEFT JOIN usuarios u ON p.estudiante_id = u.id
      LEFT JOIN lineas_tematicas lt ON p.linea_tematica_id = lt.id
      WHERE p.estudiante_id = $1
      ORDER BY p.id DESC
    `;
    const result = await pool.query(query, [estudiante_id]);
    return result.rows;
  }

  static async findByDocente(docente_id) {
    const query = `
      SELECT DISTINCT
        p.*,
        u.nombre as estudiante_nombre,
        u.email as estudiante_email,
        r.nombre as rol,
        lt.nombre as linea_tematica,
        rev.revisor_id,
        rev.comentario,
        rev.aprobado,
        rev.fecha_revision
      FROM proyectos p
      LEFT JOIN usuarios u ON p.estudiante_id = u.id
      LEFT JOIN roles r ON u.rol_id = r.id
      LEFT JOIN lineas_tematicas lt ON p.linea_tematica_id = lt.id
      INNER JOIN revisiones rev ON p.id = rev.proyecto_id
      WHERE rev.revisor_id = $1
      ORDER BY p.id DESC
    `;
    const result = await pool.query(query, [docente_id]);
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

  static async findByIdWithDetails(id) {
    const query = `
      SELECT 
        p.*,
        u.nombre as estudiante_nombre,
        u.email as estudiante_email,
        lt.nombre as linea_tematica
      FROM proyectos p
      LEFT JOIN usuarios u ON p.estudiante_id = u.id
      LEFT JOIN lineas_tematicas lt ON p.linea_tematica_id = lt.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}
