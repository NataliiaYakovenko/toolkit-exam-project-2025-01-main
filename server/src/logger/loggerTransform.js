const fs = require('fs/promises');
const path = require('path');

const LOG_DIR = path.join(__dirname, '../logs');
const LOG_FILE = path.join(LOG_DIR, 'error.log');

async function rotateLogs() {
  try {
    await fs.access(LOG_FILE);

    const data = await fs.readFile(LOG_FILE, 'utf-8');
    if (!data.trim()) return;

    const transformed = data
      .trim()
      .split('\n')
      .map(line => {
        try {
          const { message, code, time } = JSON.parse(line);
          return JSON.stringify({ message, code, time });
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .join('\n');

    if (!transformed) return;

    const fileName = `error-${Date.now()}.log`;
    await fs.writeFile(
      path.join(LOG_DIR, fileName),
      transformed + '\n',
    );

    await fs.truncate(LOG_FILE, 0);
  } catch (err) {
    console.error('Log rotation failed:', err);
  }
}

module.exports = { rotateLogs };
