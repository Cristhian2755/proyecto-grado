const pool = require("../config/db");

class LineaTematica {
  static async findAll() {
    const result = await pool.query(
      "SELECT * FROM lineas_tematicas ORDER BY nombre"
    );
    return result.rows;
  }

  static async create({ nombre }) {
    const result = await pool.query(
      "INSERT INTO lineas_tematicas (nombre) VALUES ($1) RETURNING *",
      [nombre]
    );
    return result.rows[0];
  }
}

module.exports = LineaTematica;
