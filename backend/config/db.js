const path = require("path");
const { Pool } = require("pg");

// Cargar variables de entorno desde la raíz del proyecto (.env)
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });

function getConnectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.PG_CONNECTION_STRING) return process.env.PG_CONNECTION_STRING;

  const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;
  if (PGHOST && PGUSER && PGPASSWORD && PGDATABASE) {
    const port = PGPORT || "5432";
    return `postgresql://${encodeURIComponent(PGUSER)}:${encodeURIComponent(PGPASSWORD)}@${PGHOST}:${port}/${PGDATABASE}`;
  }

  return null;
}

const connectionString = getConnectionString();

if (!connectionString) {
  console.error(
    "Falta la variable de entorno DATABASE_URL (o la configuración PGHOST/PGUSER/PGPASSWORD/PGDATABASE) en .env"
  );
  process.exit(1);
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
