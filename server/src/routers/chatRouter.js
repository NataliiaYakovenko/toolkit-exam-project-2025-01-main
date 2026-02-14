const express = require('express');
const checkToken = require('../middlewares/checkToken');
const chatController = require('../controllers/chatController');
const catalogController = require('../controllers/catalogController');
const router = express.Router();

router.post('/newMessage', checkToken.checkToken, chatController.addMessage);
router.get('/getChat', checkToken.checkToken, chatController.getChat);
router.get('/getPreview', checkToken.checkToken, chatController.getPreview);
router.post('/blackList', checkToken.checkToken, chatController.blackList);
router.post('/favorite', checkToken.checkToken, chatController.favoriteChat);

router.post(
  '/createCatalog',
  checkToken.checkToken,
  catalogController.createCatalog,
);
router.put(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog,
);
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
router.delete(
  '/deleteCatalog',
  checkToken.checkToken,
  catalogController.deleteCatalogById,
);
router.get(
  '/getCatalogs',
  checkToken.checkToken,
  catalogController.getAllCatalogs,
);

module.exports = router;
