const { pool } = require('../config/db');

class Evaluacion {
  static async create(evaluacionData) {
    const { entrega_id, evaluador_id, nota, comentario } = evaluacionData;
    const query = `
      INSERT INTO evaluaciones (entrega_id, evaluador_id, nota, comentario)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(query, [entrega_id, evaluador_id, nota, comentario]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM evaluaciones WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByEntrega(entrega_id) {
    const query = 'SELECT * FROM evaluaciones WHERE entrega_id = $1';
    const result = await pool.query(query, [entrega_id]);
    return result.rows;
  }

  static async findAll() {
    const query = 'SELECT * FROM evaluaciones';
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = Evaluacion;
