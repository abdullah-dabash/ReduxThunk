const pool = require('../db');
// Create a new user
const createUser = async (username, password, role) => {
  const result = await pool.query(
    'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
    [username, password, role]
  );
  return result.rows[0];
};

// Find a user by username
const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

// Find a user by id
const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
};
