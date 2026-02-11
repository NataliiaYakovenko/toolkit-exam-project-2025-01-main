const express = require('express');
const catalogController = require('../controllers/catalogController');
const checkToken = require('../middlewares/checkToken');
const router = express.Router();

router.post('/createCatalog', checkToken.checkToken, catalogController.createCatalog);
router.get('/getAllCatalogs', checkToken.checkToken, catalogController.getAllCatalogs);
router.get('/getCatalogById/:id', checkToken.checkToken, catalogController.getCatalogById);
router.delete(
  '/deleteCatalogById/:id',
  checkToken.checkToken,
  catalogController.deleteCatalogById,
);

module.exports = router;
