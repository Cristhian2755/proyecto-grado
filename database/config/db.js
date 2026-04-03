const { Pool } = require("pg");
require("dotenv").config({ path: "../../.env" });

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
});

async function connectDatabase() {
    try {
        await pool.query("SELECT NOW()");
        console.log("✓ PostgreSQL conectado correctamente");
        return pool;
    } catch (error) {
        console.error("Error conectando PostgreSQL:", error);
        throw error;
    }
}

module.exports = connectDatabase;