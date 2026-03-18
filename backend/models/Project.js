const pool = require("../config/db");

class Project {
  constructor({
    id,
    titulo,
    problema,
    justificacion,
    objetivos,
    estudiante_id,
    estado,
    fecha_creacion,
    estudiante_nombre,
    estudiante_email,
    estudiante_rol
  }) {
    this.id = id;
    this.titulo = titulo;
    this.problema = problema;
    this.justificacion = justificacion;
    this.objetivos = objetivos;
    this.estudianteId = estudiante_id;
    this.estado = estado;
    this.fechaCreacion = fecha_creacion;
    this.estudiante = {
      nombre: estudiante_nombre,
      email: estudiante_email,
      rol: estudiante_rol
    };
  }

  static async find() {
    const result = await pool.query(
      `SELECT p.*, u.nombre AS estudiante_nombre, u.email AS estudiante_email, u.rol AS estudiante_rol
       FROM proyectos p
       JOIN usuarios u ON u.id = p.estudiante_id
       ORDER BY p.id`
    );

    return result.rows.map((row) => new Project(row));
  }

  static async findById(id) {
    const result = await pool.query(
      `SELECT p.*, u.nombre AS estudiante_nombre, u.email AS estudiante_email, u.rol AS estudiante_rol
       FROM proyectos p
       JOIN usuarios u ON u.id = p.estudiante_id
       WHERE p.id = $1
       LIMIT 1`,
      [id]
    );

    if (result.rowCount === 0) return null;
    return new Project(result.rows[0]);
  }

  async save() {
    if (this.id) {
      const result = await pool.query(
        `UPDATE proyectos
         SET titulo = $1, problema = $2, justificacion = $3, objetivos = $4, estado = $5
         WHERE id = $6
         RETURNING *`,
        [
          this.titulo,
          this.problema,
          this.justificacion,
          this.objetivos,
          this.estado,
          this.id
        ]
      );

      return new Project(result.rows[0]);
    }

    const result = await pool.query(
      `INSERT INTO proyectos (titulo, problema, justificacion, objetivos, estudiante_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        this.titulo,
        this.problema,
        this.justificacion,
        this.objetivos,
        this.estudianteId
      ]
    );

    return new Project(result.rows[0]);
  }
}

module.exports = Project;
