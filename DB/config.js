const { Pool } = require('pg');
const { CREATEROLESTABLE, CREATEUSERSTABLE }  = require(`../Schemas/createUsersTable`)

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'tobuy_list',
  password: 'admin',
  port: 5432,
});

async function initDB() {
  try {
    await pool.query(CREATEROLESTABLE);
    console.log('✅ Roles table created or already exists.');

    await pool.query(CREATEUSERSTABLE);
    console.log('✅ Users table created or already exists.');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
}

module.exports = {
  pool,
  initDB
};
