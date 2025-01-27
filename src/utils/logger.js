const levels = ['debug', 'info', 'warn', 'error'];
const current = process.env.LOG_LEVEL || 'info';
const threshold = levels.indexOf(current);

function emit(level, ...args) {
  if (levels.indexOf(level) < threshold) return;
  const ts = new Date().toISOString();
  console.log(`${ts} [${level}]`, ...args);
}

module.exports = {
  debug: (...a) => emit('debug', ...a),
  info: (...a) => emit('info', ...a),
  warn: (...a) => emit('warn', ...a),
  error: (...a) => emit('error', ...a),
};
