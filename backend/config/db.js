//Conexion de DB Azure por medio de Pool
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: { rejectUnauthorized: false } // Para Azure
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log("PostgreSQL conectado correctamente");
  } catch (error) {
    console.error("Error de conexión a PostgreSQL:", error.message);
    process.exit(1);
  }
};

module.exports = { pool, connectDB };