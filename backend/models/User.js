const { pool } = require('../config/db');

class User {
  static async create(userData) {
    const { nombre, email, password, rol = 'estudiante' } = userData;
    
    // Obtener el ID del rol
    let rolId;
    if (typeof rol === 'string') {
      const roleQuery = 'SELECT id FROM roles WHERE LOWER(nombre) = LOWER($1) LIMIT 1';
      const roleResult = await pool.query(roleQuery, [rol]);
      rolId = roleResult.rows[0]?.id || 3; // Default a estudiante (id 3)
    } else {
      rolId = rol;
    }

    const query = `
      INSERT INTO usuarios (nombre, email, contrasena, rol_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, email, (SELECT nombre FROM roles WHERE id = rol_id) as rol
    `;
    const values = [nombre, email, password, rolId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email) {
    const query = `
      SELECT u.id, u.nombre, u.email, u.contrasena as password, COALESCE(r.nombre, 'estudiante') as rol
      FROM usuarios u
      LEFT JOIN roles r ON r.id = u.rol_id
      WHERE u.email = $1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT u.id, u.nombre, u.email, u.contrasena as password, COALESCE(r.nombre, 'estudiante') as rol
      FROM usuarios u
      LEFT JOIN roles r ON r.id = u.rol_id
      WHERE u.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT u.id, u.nombre, u.email, COALESCE(r.nombre, 'estudiante') as rol
      FROM usuarios u
      LEFT JOIN roles r ON r.id = u.rol_id
      ORDER BY u.id
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async updateUser(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.nombre !== undefined) {
      fields.push(`nombre = $${paramCount}`);
      values.push(updates.nombre);
      paramCount++;
    }

    if (updates.email !== undefined) {
      fields.push(`email = $${paramCount}`);
      values.push(updates.email);
      paramCount++;
    }

    if (updates.password !== undefined) {
      fields.push(`contrasena = $${paramCount}`);
      values.push(updates.password);
      paramCount++;
    }

    if (updates.rol !== undefined) {
      let rolId;
      if (typeof updates.rol === 'string') {
        const roleQuery = 'SELECT id FROM roles WHERE LOWER(nombre) = LOWER($1) LIMIT 1';
        const roleResult = await pool.query(roleQuery, [updates.rol]);
        rolId = roleResult.rows[0]?.id || 3;
      } else {
        rolId = updates.rol;
      }
      fields.push(`rol_id = $${paramCount}`);
      values.push(rolId);
      paramCount++;
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const query = `
      UPDATE usuarios
      SET ${fields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, nombre, email, (SELECT nombre FROM roles WHERE id = rol_id) as rol
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async deleteUser(id) {
    const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = User;
