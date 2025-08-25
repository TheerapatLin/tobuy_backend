const { Pool } = require('pg');
const { 
  CREATEROLESTABLE, 
  CREATEUSERSTABLE,
 }  = require(`../schemas/createUsersTable`)
const { 
  CREATETOBUYLISTTABLE,
  CREATETOBUYITEMSTABLE,
  CREATETOBUYLISTITEMSTABLE
 }  = require(`../schemas/toBuySchemas`)
const config = require('../config')

// connect to db_url
const pool = new Pool({
  connectionString: config.db_url
});

// เมื่อเริ่มต้น server ให้สร้าง table
async function initDB() {
  try {
    await pool.query(CREATEROLESTABLE);
    console.log('✅ Roles table created or already exists.');

    await pool.query(CREATEUSERSTABLE);
    console.log('✅ Users table created or already exists.');

    await pool.query(CREATETOBUYLISTTABLE);
    console.log('✅ ToBuyLists table created or already exists.');

    await pool.query(CREATETOBUYITEMSTABLE);
    console.log('✅ ToBuyItems table created or already exists.');

    await pool.query(CREATETOBUYLISTITEMSTABLE);
    console.log('✅ ToBuyListItems table created or already exists.');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
}

module.exports = {
  pool,
  initDB
};
