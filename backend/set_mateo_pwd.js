const bcrypt = require('bcryptjs');
const { pool } = require('./config/db');

(async () => {
  try {
    const tempPassword = 'Mateo12345!';
    const hashed = await bcrypt.hash(tempPassword, 10);
    const result = await pool.query(
      'UPDATE usuarios SET contrasena = $1 WHERE nombre = $2 RETURNING id, nombre, email',
      [hashed, 'Mateo']
    );

    if (!result.rows.length) {
      console.log('No existe usuario con nombre=Mateo');
      process.exit(1);
    }

    console.log('✓ Password temporal asignada a Mateo');
    console.log('TEMP_PASSWORD=Mateo12345!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
