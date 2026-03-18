const pool = require("../config/db");

class LineaTematica {
  constructor({ id, nombre }) {
    this.id = id;
    this.nombre = nombre;
  }

  static async findAll() {
    const result = await pool.query(
      "SELECT * FROM lineas_tematicas ORDER BY nombre"
    );
    return result.rows.map((row) => new LineaTematica(row));
  }

  static async create({ nombre }) {
    const result = await pool.query(
      "INSERT INTO lineas_tematicas (nombre) VALUES () RETURNING *",
      [nombre]
    );
    return new LineaTematica(result.rows[0]);
  }
}

module.exports = LineaTematica;
