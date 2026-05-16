const { pool } = require('../config/db');

class User {
  static async create(userData) {
    const { nombre, email, password, rol = 'estudiante', subroles = [], carrera_id = null } = userData;

    const carreraValue = carrera_id === '' || carrera_id === undefined ? null : carrera_id;
    
    const query = `
      INSERT INTO usuarios (nombre, email, contrasena, rol_principal, carrera_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nombre, email, rol_principal as rol, carrera_id
    `;
    const values = [nombre, email, password, rol, carreraValue];
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
      SELECT u.id, u.nombre, u.email, u.contrasena as password, u.rol_principal as rol, u.carrera_id
      FROM usuarios u
      WHERE u.email = $1
    `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT u.id, u.nombre, u.email, u.contrasena as password, u.rol_principal as rol, u.carrera_id
      FROM usuarios u
      WHERE u.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findAll() {
    const query = `
      SELECT u.id, u.nombre, u.email, u.rol_principal as rol, u.carrera_id, c.nombre as carrera_nombre
      FROM usuarios u
      LEFT JOIN carreras c ON c.id = u.carrera_id
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

  static async getDocenteAssignments(docenteId) {
    const query = `
      SELECT u.id, u.nombre, u.email, u.rol_principal as rol, de.rol as assignedRole
      FROM docente_estudiantes de
      JOIN usuarios u ON de.estudiante_id = u.id
      WHERE de.docente_id = $1
      ORDER BY u.nombre
    `;
    const result = await pool.query(query, [docenteId]);
    return result.rows;
  }

  static async getDocenteAssignment(docenteId, studentId) {
    const query = `
      SELECT * FROM docente_estudiantes
      WHERE docente_id = $1 AND estudiante_id = $2
    `;
    const result = await pool.query(query, [docenteId, studentId]);
    return result.rows[0];
  }

  static async setDocenteAssignment(docenteId, studentId, role) {
    const existing = await this.getDocenteAssignment(docenteId, studentId);
    if (existing) {
      const query = `
        UPDATE docente_estudiantes
        SET rol = $3
        WHERE docente_id = $1 AND estudiante_id = $2
        RETURNING *
      `;
      const result = await pool.query(query, [docenteId, studentId, role]);
      return result.rows[0];
    }

    const query = `
      INSERT INTO docente_estudiantes (docente_id, estudiante_id, rol)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [docenteId, studentId, role]);
    return result.rows[0];
  }

  static async deleteDocenteAssignment(docenteId, studentId) {
    const query = `
      DELETE FROM docente_estudiantes
      WHERE docente_id = $1 AND estudiante_id = $2
      RETURNING *
    `;
    const result = await pool.query(query, [docenteId, studentId]);
    return result.rows[0];
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

    if (updates.carrera_id !== undefined) {
      fields.push(`carrera_id = $${paramCount}`);
      values.push(updates.carrera_id);
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
      RETURNING id, nombre, email, rol_principal as rol, carrera_id
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

  static async findCarreraById(id) {
    const query = `
      SELECT id, nombre, facultad
      FROM carreras
      WHERE id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findAllCarreras() {
    const query = `
      SELECT id, nombre, facultad
      FROM carreras
      ORDER BY nombre
    `;
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = User;
