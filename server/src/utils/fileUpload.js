const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { FILES_PATH }= require('../constants');
const ServerError = require('../errors/ServerError');
const env = process.env.NODE_ENV || 'development';
const devFilePath = path.resolve(FILES_PATH, 'images');

const filePath = env === 'production'
  ? '/var/www/html/images/'
  : devFilePath;

if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, {
    recursive: true,
  });
}

const storageContestFiles = multer.diskStorage({
  destination (req, file, cb) {
    cb(null, filePath);
  },
  filename (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadAvatars = multer({ storage: storageContestFiles }).single('file');
const uploadContestFiles = multer({ storage: storageContestFiles }).array(
  'files', 3);
const updateContestFile = multer({ storage: storageContestFiles }).single(
  'file');
const uploadLogoFiles = multer({ storage: storageContestFiles }).single(
  'offerData');

