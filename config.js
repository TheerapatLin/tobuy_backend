require('dotenv').config();

const config = {
  port_b: process.env.PORT_BACKEND || 8080,
  port_f: process.env.PORT_FRONTEND,
  host: process.env.HOST,
  postgres_user: process.env.POSTGRES_USER,
  postgres_password: process.env.POSTGRES_PASSWORD,
  postgres_db: process.env.POSTGRES_DB,
  postgres_port: process.env.POSTGRES_PORT
};

module.exports = config;