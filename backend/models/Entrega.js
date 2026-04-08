const { pool } = require('../config/db');

class Entrega {
  static async create(entregaData) {
    const { proyecto_id, archivo, version } = entregaData;
    const query = `
      INSERT INTO entregas (proyecto_id, archivo, version)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [proyecto_id, archivo, version]);
    return result.rows[0];
  }

  static async getNextVersion(proyecto_id) {
    const query = 'SELECT COALESCE(MAX(version), 0) AS max_version FROM entregas WHERE proyecto_id = $1';
    const result = await pool.query(query, [proyecto_id]);
    return Number(result.rows[0].max_version) + 1;
  }

  static async findById(id) {
    const query = 'SELECT * FROM entregas WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByProyecto(proyecto_id) {
    const query = 'SELECT * FROM entregas WHERE proyecto_id = $1 ORDER BY fecha_entrega DESC';
    const result = await pool.query(query, [proyecto_id]);
    return result.rows;
  }

  static async findAll() {
    const query = 'SELECT * FROM entregas';
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = Entrega;
