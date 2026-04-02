const { pool } = require('../config/db');

class User {
  static async create(userData) {
    const { nombre, email, password, rol = 'estudiante' } = userData;
    const query = `
      INSERT INTO usuarios (nombre, email, password, rol)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [nombre, email, password, rol];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM usuarios';
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = User;
