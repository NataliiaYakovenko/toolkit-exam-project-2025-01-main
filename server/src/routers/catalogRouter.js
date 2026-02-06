const express = require('express');
const catalogController = require('../controllers/catalogController');
const checkToken = require('../middlewares/checkToken');
const router = express.Router();

router.post('/', checkToken.checkToken, catalogController.createCatalog);
router.get('/', checkToken.checkToken, catalogController.getAllCatalogs);
router.get('/:id', checkToken.checkToken, catalogController.getCatalogById);
router.delete(
  '/:id',
  checkToken.checkToken,
  catalogController.deleteCatalogById,
);

module.exports = router;
