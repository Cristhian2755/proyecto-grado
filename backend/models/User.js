const { pool } = require('../config/db');

class User {
  static async create(userData) {
    const { nombre, email, password, rol = 'estudiante', subroles = [] } = userData;
    
    const query = `
      INSERT INTO usuarios (nombre, email, contrasena, rol_principal)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, email, rol_principal as rol
    `;
    const values = [nombre, email, password, rol];
    const result = await pool.query(query, values);
    const user = result.rows[0];

    // Insertar subroles si existen (para docentes que son asesor/jurado)
    if (subroles && subroles.length > 0) {
      for (const subrrol of subroles) {
        await pool.query(
          `INSERT INTO usuario_roles (usuario_id, rol) VALUES ($1, $2)`,
          [user.id, subrrol]
        );
      }
    } else if (rol === 'docente') {
      // Si es docente pero no especifica subroles, inserta el rol docente
      await pool.query(
        `INSERT INTO usuario_roles (usuario_id, rol) VALUES ($1, $2)`,
        [user.id, 'docente']
      );
    }

    return user;
  }

  static async findByEmail(email) {
    const query = `
      SELECT u.id, u.nombre, u.email, u.contrasena as password, u.rol_principal as rol
      FROM usuarios u
      WHERE u.email = $1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT u.id, u.nombre, u.email, u.contrasena as password, u.rol_principal as rol
      FROM usuarios u
      WHERE u.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT u.id, u.nombre, u.email, u.rol_principal as rol
      FROM usuarios u
      ORDER BY u.id
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getUserRoles(userId) {
    const query = `
      SELECT rol FROM usuario_roles WHERE usuario_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows.map(row => row.rol);
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
      fields.push(`rol_principal = $${paramCount}`);
      values.push(updates.rol);
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
      RETURNING id, nombre, email, rol_principal as rol
    `;

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async setUserSubroles(userId, subroles) {
    // Eliminar subroles anteriores
    await pool.query(
      `DELETE FROM usuario_roles WHERE usuario_id = $1`,
      [userId]
    );

    // Insertar nuevos subroles
    for (const subrrol of subroles) {
      await pool.query(
        `INSERT INTO usuario_roles (usuario_id, rol) VALUES ($1, $2)`,
        [userId, subrrol]
      );
    }

    return true;
  }

  static async deleteUser(id) {
    const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = User;
