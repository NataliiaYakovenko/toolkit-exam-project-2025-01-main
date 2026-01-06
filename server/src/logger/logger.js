const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'error.log');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function logError(error, code = 500) {
  const logEntry = {
    message: error.message || String(error),
    time: Date.now(),
    code,
    stackTrace: error.stack || {},
  };

  fs.appendFile(
    LOG_FILE,
    JSON.stringify(logEntry) + '\n',
    (err) => {
      if (err) {
        console.error('Failed to write log:', err);
      }
    },
  );
}

module.exports = { logError };
