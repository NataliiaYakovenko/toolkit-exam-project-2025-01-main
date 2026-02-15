const express = require('express');
const checkToken = require('../middlewares/checkToken');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.get('/getChat', checkToken.checkToken, chatController.getChat);
router.get('/getPreview', checkToken.checkToken, chatController.getPreview);
router.post('/blackList', checkToken.checkToken, chatController.blackList);
router.post('/favorite', checkToken.checkToken, chatController.favoriteChat);


router.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog,
);
router.delete(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog,
);


module.exports = router;
