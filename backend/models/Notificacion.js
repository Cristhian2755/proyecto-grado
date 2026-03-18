const pool = require("../config/db");

class Notificacion {
  constructor({ id, usuario_id, mensaje, leido, fecha }) {
    this.id = id;
    this.usuarioId = usuario_id;
    this.mensaje = mensaje;
    this.leido = leido;
    this.fecha = fecha;
  }

  static async findByUser(userId) {
    const result = await pool.query(
      "SELECT * FROM notificaciones WHERE usuario_id =  ORDER BY fecha DESC",
      [userId]
    );
    return result.rows.map((row) => new Notificacion(row));
  }

  async save() {
    if (this.id) {
      const result = await pool.query(
        UPDATE notificaciones
         SET mensaje = , leido = 
         WHERE id = 
         RETURNING *,
        [this.mensaje, this.leido, this.id]
      );
      return new Notificacion(result.rows[0]);
    }

    const result = await pool.query(
      INSERT INTO notificaciones (usuario_id, mensaje, leido)
       VALUES (, , )
       RETURNING *,
      [this.usuarioId, this.mensaje, this.leido]
    );
    return new Notificacion(result.rows[0]);
  }
}

module.exports = Notificacion;
