const pool = require("../config/db");

class User {
  constructor({ id, nombre, email, password, rol, fecha_registro }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.fechaRegistro = fecha_registro || null;
  }

  static async findOne({ email }) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1 LIMIT 1",
      [email]
    );

    if (result.rowCount === 0) return null;

    return new User(result.rows[0]);
  }

  static async findById(id) {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE id = $1 LIMIT 1",
      [id]
    );

    if (result.rowCount === 0) return null;

    return new User(result.rows[0]);
  }

  async save() {
    if (this.id) {
      const result = await pool.query(
        `UPDATE usuarios
         SET nombre = $1, email = $2, password = $3, rol = $4
         WHERE id = $5
         RETURNING *`,
        [this.nombre, this.email, this.password, this.rol, this.id]
      );
      Object.assign(this, result.rows[0]);
      return this;
    }

    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, password, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [this.nombre, this.email, this.password, this.rol]
    );

    Object.assign(this, result.rows[0]);
    return this;
  }
}

module.exports = User;
