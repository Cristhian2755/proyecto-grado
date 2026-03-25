const pool = require("../config/db");

class User {
  static async findOne({ email }) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1 LIMIT 1",
      [email]
    );
    return result.rows[0] || null;
  }

  static async findById(id) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1 LIMIT 1",
      [id]
    );
    return result.rows[0] || null;
  }

  static async create({ nombre, email, password, rol }) {
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, email, password, rol]
    );
    return result.rows[0];
  }
}

module.exports = User;
