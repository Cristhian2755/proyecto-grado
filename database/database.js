// database/database.js
// Helper para conectar desde scripts y utilidades a la base de datos PostgreSQL.

const pool = require("./config/db");

async function query(text, params) {
  return pool.query(text, params);
}

async function close() {
  await pool.end();
}

module.exports = {
  pool,
  query,
  close
};
