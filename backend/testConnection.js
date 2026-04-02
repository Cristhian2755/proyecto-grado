const { pool } = require('./config/db');

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Conexión exitosa a PostgreSQL');
    const result = await client.query('SELECT NOW()');
    console.log('Hora del servidor:', result.rows[0]);
    client.release();
    process.exit(0);
  } catch (error) {
    console.error('Error de conexión:', error);
    process.exit(1);
  }
}

testConnection();