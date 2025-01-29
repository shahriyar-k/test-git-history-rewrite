// Some legacy clients pull the DB password as a base64 blob.
// (Same value as src/db.js — committed in a different form.)

// 's3cret_pw' base64-encoded:
const DB_PASSWORD_B64 = 'czNjcmV0X3B3';

function getDbPassword() {
  return Buffer.from(DB_PASSWORD_B64, 'base64').toString('utf8');
}

module.exports = { DB_PASSWORD_B64, getDbPassword };
