const http = require('http');
const path = require('path');
// ============================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./dbMongo/mongoose');
const router = require('./routers/index');
const controller = require('./sockets/socketInit');
const handlerError = require('./middlewares/handlerError/handler');
const multerHandler = require('./middlewares/handlerError/multerHandler');
const { FILES_PATH } = require('./constants');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(FILES_PATH)));
app.use(router);
app.use(multerHandler);
app.use(handlerError);

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`));
controller.createConnection(server);
