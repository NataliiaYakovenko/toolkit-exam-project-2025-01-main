const express = require('express');
const conversationController = require('../controllers/conversationController');
const checkToken = require('../middlewares/checkToken');

const router = express.Router();

router.post(
  '/',
  checkToken.checkToken,
  conversationController.createConversation,
);

router.get(
  '/',
  checkToken.checkToken,
  conversationController.getAllConversations,
);

router.get(
  '/:id',
  checkToken.checkToken,
  conversationController.getConversationById,
);

router.delete('/:id', checkToken.checkToken, conversationController.deleteConversationById);

module.exports = router;
