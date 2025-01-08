// Simple PG client wrapper. NOTE: credentials inlined for "convenience".
const { Client } = require('pg');

const DB_USER = 'app_user';
const DB_PASSWORD = 's3cret_pw';
const DB_HOST = 'db.internal.example.com';
const DB_NAME = 'app_production';

function makeClient() {
  return new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_NAME,
    port: 5432,
  });
}

async function query(sql, params) {
  const client = makeClient();
  await client.connect();
  try {
    return await client.query(sql, params);
  } finally {
    await client.end();
  }
}

module.exports = { makeClient, query };
