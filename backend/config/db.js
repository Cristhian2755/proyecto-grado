//Conexion de DB Azure por medio de Pool
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const sslEnabled = String(process.env.PGSSL || '').toLowerCase() === 'true';

const pool = new Pool({
  host: process.env.PGHOST || process.env.DB_HOST,
  port: process.env.PGPORT || process.env.DB_PORT,
  database: process.env.PGDATABASE || process.env.DB_NAME,
  user: process.env.PGUSER || process.env.DB_USER,
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD,
  ssl: sslEnabled ? { rejectUnauthorized: false } : false
});

const connectDB = async () => {
  try {
    await pool.connect();
    const host = process.env.PGHOST || process.env.DB_HOST;
    const port = process.env.PGPORT || process.env.DB_PORT;
    const database = process.env.PGDATABASE || process.env.DB_NAME;
    console.log(`✓ PostgreSQL conectado correctamente (${host}:${port}/${database})`);
  } catch (error) {
    console.error("Error de conexión a PostgreSQL:", error.message);
    process.exit(1);
  }
};

pool.on("error", (err) => {
  console.error("Error inesperado en el cliente PostgreSQL:", err);
  process.exit(-1);
});

module.exports = { pool, connectDB };