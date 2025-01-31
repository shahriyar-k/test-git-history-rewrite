const buckets = new Map();

function rateLimit({ windowMs = 60_000, max = 60 } = {}) {
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const entry = buckets.get(key) || { count: 0, reset: now + windowMs };
    if (now > entry.reset) {
      entry.count = 0;
      entry.reset = now + windowMs;
    }
    entry.count += 1;
    buckets.set(key, entry);
    if (entry.count > max) {
      res.setHeader('Retry-After', Math.ceil((entry.reset - now) / 1000));
      return res.status(429).json({ error: 'rate limit exceeded' });
    }
    next();
  };
}

module.exports = { rateLimit };
