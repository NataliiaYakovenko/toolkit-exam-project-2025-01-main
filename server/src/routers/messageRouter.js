const express = require('express');
const messageController = require('../controllers/messageController');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post('/', checkToken.checkToken, messageController.createMessage);

router.get('/conversation/:conversationId', checkToken.checkToken, messageController.getAllMessages);

router.get('/:id', checkToken.checkToken, messageController.getMessageById);

router.delete('/:id', checkToken.checkToken, messageController.deleteMessageById);

module.exports = router;
