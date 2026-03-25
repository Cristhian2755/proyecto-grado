const path = require("path");
const { Pool } = require("pg");

// Cargar variables de entorno desde la raíz del proyecto (.env)
require("dotenv").config({ path: path.resolve(__dirname, "..", "..", ".env") });

function getConnectionString() {
  // Preferir variables PG_* explícitas para evitar ambigüedades con URL
  const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env;
  if (PGHOST && PGUSER && PGPASSWORD && PGDATABASE) {
    const port = PGPORT || "5432";
    return `postgresql://${encodeURIComponent(PGUSER)}:${encodeURIComponent(PGPASSWORD)}@${PGHOST}:${port}/${PGDATABASE}`;
  }

  // Fallback a DATABASE_URL si no se especifican las PG_* variables.
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (process.env.PG_CONNECTION_STRING) return process.env.PG_CONNECTION_STRING;

  return null;
}

const connectionString = getConnectionString();

if (!connectionString) {
  console.error(
    "Falta la variable de entorno DATABASE_URL (o la configuración PGHOST/PGUSER/PGPASSWORD/PGDATABASE) en .env"
  );
  process.exit(1);
}

try {
  const url = new URL(connectionString);
  console.log(`Conectando a PostgreSQL con usuario: ${url.username}@${url.hostname}`);
} catch (err) {
  // Si no es un URL válido, no hacemos log
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
