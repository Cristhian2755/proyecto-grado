const { pool } = require('../config/db');

class LineaTematica {
  static async create(nombre) {
    const query = 'INSERT INTO lineas_tematicas (nombre) VALUES ($1) RETURNING *';
    const result = await pool.query(query, [nombre]);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM lineas_tematicas';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM lineas_tematicas WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = LineaTematica;
