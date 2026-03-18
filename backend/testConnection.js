// backend/testConnection.js
const pool = require("./config/db");

(async () => {
  try {
    const res = await pool.query("SELECT 1");
    console.log("✅ Conexión exitosa a PostgreSQL", res.rows[0]);
  } catch (err) {
    console.error("❌ Error conectando a PostgreSQL:", err);
  } finally {
    await pool.end();
  }
})();
