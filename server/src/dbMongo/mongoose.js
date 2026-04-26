const path = require('path');
// =========================
const mongoose = require('mongoose');
// ===============================
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config/mongoConfig.json');
const config = require(configPath)[env];

mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.database}`)
  .then(() => {})
  .catch(() => {});

mongoose.set('debug', env === 'development');

module.exports = mongoose;
