const bcrypt = require('../backend/node_modules/bcryptjs');
const { pool } = require('../backend/config/db');

(async () => {
  try {
    const tempPassword = 'Admin12345!';
    const hashed = await bcrypt.hash(tempPassword, 10);
    const result = await pool.query(
      'UPDATE usuarios SET contrasena = $1 WHERE id = $2 RETURNING id, nombre, email',
      [hashed, 1]
    );

    if (!result.rows.length) {
      console.log('No existe usuario con id=1');
      process.exit(1);
    }

    console.log('Password temporal asignada a usuario 1:', result.rows[0]);
    console.log('TEMP_PASSWORD=Admin12345!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
