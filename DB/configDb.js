const { Pool } = require('pg');
const { CREATEROLESTABLE, CREATEUSERSTABLE }  = require(`../schemas/createUsersTable`)
const config = require('../config')

const pool = new Pool({
  connectionString: config.db_url
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
