const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'error.log');

function ensureLogDir(cb) {
  fs.access(LOG_DIR, fs.constants.F_OK, (err) => {
    if (err) {
      fs.mkdir(LOG_DIR, { recursive: true }, cb);
    } else {
      cb();
    }
  });
}

function logError(error, code = 500) {
  const logEntry = {
    message: error.message || String(error),
    time: Date.now(),
    code,
    stackTrace: error.stack || {},
  };

  ensureLogDir(() => {
    fs.appendFile(LOG_FILE, JSON.stringify(logEntry) + '\n', (err) => {
      if (err) {
         process.stderr.write('Failed to write log:', err);
      }
    });
  });
}

module.exports = { logError };
