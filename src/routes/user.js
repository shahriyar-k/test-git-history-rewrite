const express = require('express');
const users = require('../models/user');
const { authRequired } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authRequired, async (req, res) => {
  const u = await users.findById(req.user.sub);
  if (!u) return res.status(404).json({ error: 'not found' });
  res.json(u);
});

router.get('/:id', authRequired, async (req, res) => {
  const u = await users.findById(req.params.id);
  if (!u) return res.status(404).json({ error: 'not found' });
  res.json(u);
});

router.post('/', async (req, res) => {
  const { email, name } = req.body;
  const u = await users.create({ email, name });
  res.status(201).json(u);
});

module.exports = router;
