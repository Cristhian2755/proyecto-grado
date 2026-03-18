const pool = require("../config/db");

class Entrega {
  constructor({ id, proyecto_id, estudiante_id, descripcion, fecha_entrega, archivo_url }) {
    this.id = id;
    this.proyectoId = proyecto_id;
    this.estudianteId = estudiante_id;
    this.descripcion = descripcion;
    this.fechaEntrega = fecha_entrega;
    this.archivoUrl = archivo_url;
  }

  static async findByProject(projectId) {
    const result = await pool.query(
      "SELECT * FROM entregas WHERE proyecto_id =  ORDER BY fecha_entrega DESC",
      [projectId]
    );
    return result.rows.map((row) => new Entrega(row));
  }

  async save() {
    if (this.id) {
      const result = await pool.query(
        UPDATE entregas
         SET descripcion = , archivo_url = 
         WHERE id = 
         RETURNING *,
        [this.descripcion, this.archivoUrl, this.id]
      );
      return new Entrega(result.rows[0]);
    }

    const result = await pool.query(
      INSERT INTO entregas (proyecto_id, estudiante_id, descripcion, archivo_url)
       VALUES (, , , )
       RETURNING *,
      [this.proyectoId, this.estudianteId, this.descripcion, this.archivoUrl]
    );
    return new Entrega(result.rows[0]);
  }
}

module.exports = Entrega;
