// verificar que eta conectado a la bsae de datos de Azure
const pool = require("./config/db");

(async () => {
  try {
    const res = await pool.query("SELECT 1");
    console.log("Conexión exitosa a PostgreSQL Azure", res.rows[0]);
  } catch (err) {
    console.error("Error conectando a PostgreSQL Azure:", err);
  } finally {
    await pool.end();
  }
})();
