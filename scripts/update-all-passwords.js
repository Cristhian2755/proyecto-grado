const bcrypt = require('../backend/node_modules/bcryptjs');
const { pool } = require('../backend/config/db');

(async () => {
  try {
    const newPassword = '123456';
    const hashed = await bcrypt.hash(newPassword, 10);
    
    console.log('Actualizando todas las contraseñas a "123456"...');
    
    const result = await pool.query(
      'UPDATE usuarios SET contrasena = $1 RETURNING id, nombre, email',
      [hashed]
    );

    console.log(`✅ ${result.rows.length} usuarios actualizados:`);
    result.rows.forEach(user => {
      console.log(`   - ${user.nombre} (${user.email})`);
    });
    
    console.log('\n✅ Todas las contraseñas están ahora configuradas a: 123456');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
