const { Pool } = require('pg');
const { CREATEROLESTABLE, CREATEUSERSTABLE }  = require(`../Schemas/createUsersTable`)
const config = require('../config')

const pool = new Pool({
  user: config.postgres_user,
  host: config.host,
  database: config.postgres_db,
  password: config.postgres_password,
  port: config.postgres_port,
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
