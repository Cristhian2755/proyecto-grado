const pool = require("../config/db");

class Evaluacion {
  constructor({ id, proyecto_id, evaluador_id, comentario, aprobado, fecha_evaluacion }) {
    this.id = id;
    this.proyectoId = proyecto_id;
    this.evaluadorId = evaluador_id;
    this.comentario = comentario;
    this.aprobado = aprobado;
    this.fechaEvaluacion = fecha_evaluacion;
  }

  static async findByProject(projectId) {
    const result = await pool.query(
      "SELECT * FROM evaluaciones WHERE proyecto_id =  ORDER BY fecha_evaluacion DESC",
      [projectId]
    );
    return result.rows.map((row) => new Evaluacion(row));
  }

  async save() {
    if (this.id) {
      const result = await pool.query(
        UPDATE evaluaciones
         SET comentario = , aprobado = 
         WHERE id = 
         RETURNING *,
        [this.comentario, this.aprobado, this.id]
      );
      return new Evaluacion(result.rows[0]);
    }

    const result = await pool.query(
      INSERT INTO evaluaciones (proyecto_id, evaluador_id, comentario, aprobado)
       VALUES (, , , )
       RETURNING *,
      [this.proyectoId, this.evaluadorId, this.comentario, this.aprobado]
    );
    return new Evaluacion(result.rows[0]);
  }
}

module.exports = Evaluacion;
