const express = require('express');
const catalogController = require('../controllers/catalogController');
const checkToken = require('../middlewares/checkToken');
const router = express.Router();

router.post(
  '/createCatalog',
  checkToken.checkToken,
  catalogController.createCatalog,
);

router.put(
  '/updateNameCatalog',
  checkToken.checkToken,
  catalogController.updateNameCatalog,
);

router.delete(
  '/deleteCatalog/:catalogId',
  checkToken.checkToken,
  catalogController.deleteCatalog,
);

router.get(
  '/getCatalogs',
  checkToken.checkToken,
  catalogController.getCatalogs,
);


module.exports = router;
