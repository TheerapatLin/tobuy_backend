const CHECKUSER = `SELECT * FROM users WHERE username = $1 OR email = $2`

const SIGNUPUSER = `INSERT INTO users (username, email, password, role_id) VALUES ($1, $2, $3, 2)`

module.exports = {
    CHECKUSER,
    SIGNUPUSER
}