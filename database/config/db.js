const path = require("path");
const { Pool } = require("pg");

// Cargar variables de entorno desde la raíz del proyecto (.env)
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });

const connectionString = process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("Falta la variable de entorno DATABASE_URL o PG_CONNECTION_STRING en .env");
}

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on("error", (err) => {
  console.error("Error inesperado en el cliente PostgreSQL:", err);
  process.exit(-1);
});

module.exports = pool;
