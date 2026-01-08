const cron = require('node-cron');
const { rotateLogs } = require('../logger/loggerTransform');

cron.schedule('0 0 * * *', () => {
  rotateLogs();
  console.log('Logs rotated');
});
