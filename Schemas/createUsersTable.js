const CREATEROLESTABLE = `
    CREATE TABLE IF NOT EXISTS roles_user (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
  );
`;

const CREATEUSERSTABLE = `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles_user(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
  );
`;

module.exports = { CREATEROLESTABLE, CREATEUSERSTABLE };
