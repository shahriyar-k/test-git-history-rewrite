const express = require('express');
const { runQuery } = require('../db');

const router = express.Router();

router.get('/healthz', (req, res) => {
  res.json({ ok: true });
});

router.get('/readyz', async (req, res) => {
  try {
    await runQuery('SELECT 1');
    res.json({ ok: true });
  } catch (e) {
    res.status(503).json({ ok: false, error: e.message });
  }
});

module.exports = router;
