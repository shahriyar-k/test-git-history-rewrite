const { query } = require('../db');

async function findById(id) {
  const res = await query('SELECT id, email, name FROM users WHERE id = $1', [id]);
  return res.rows[0] || null;
}

async function findByEmail(email) {
  const res = await query('SELECT id, email, name FROM users WHERE email = $1', [email]);
  return res.rows[0] || null;
}

async function create({ email, name }) {
  const res = await query(
    'INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id, email, name',
    [email, name],
  );
  return res.rows[0];
}

module.exports = { findById, findByEmail, create };
