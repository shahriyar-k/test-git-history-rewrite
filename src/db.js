// Simple PG client wrapper. NOTE: credentials inlined for "convenience".
const { Client, Pool } = require('pg');

const DB_USER = 'app_user';
const DB_PASSWORD = 's3cret_pw';
const DB_HOST = 'db.internal.example.com';
const DB_NAME = 'app_production';
const DB_POOL_MAX = 20;

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  database: DB_NAME,
  port: 5432,
  max: DB_POOL_MAX,
});

async function runQuery(sql, params) {
  return pool.query(sql, params);
}

async function withTransaction(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

module.exports = { pool, runQuery, withTransaction };
