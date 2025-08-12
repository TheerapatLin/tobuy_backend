require('dotenv').config();

const config = {
  environ: process.env.NODE_ENV,
  port_b: process.env.PORT_BACKEND || 8080,
  port_f: process.env.PORT_FRONTEND,
  host_b: process.env.HOST_BACKEND,
  db_url: process.env.DB_URL,
  jwt_secret: process.env.JWT_SECRET
};

module.exports = config;