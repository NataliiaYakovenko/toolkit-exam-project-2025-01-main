const express = require('express');
const messageController = require('../controllers/messageController');

const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/newMessage', checkToken.checkToken, messageController.addMessage);


module.exports = router;
