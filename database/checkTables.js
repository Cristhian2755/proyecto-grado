const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: { rejectUnauthorized: false }
});

async function testTables() {
  const client = await pool.connect();
  try {
    // Verificar tablas
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Tablas en la BD:');
    result.rows.forEach(row => console.log(' -', row.table_name));
    
    client.release();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    client.release();
    process.exit(1);
  }
}

testTables();