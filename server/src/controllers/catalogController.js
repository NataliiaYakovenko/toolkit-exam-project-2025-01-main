const db = require('../models');
const { logError } = require('../logger/logger');

module.exports.createCatalog = async (req, res, next) => {
  try {
    const { catalogName } = req.body;
    const { userId } = req.tokenData;
    const createdCatalog = await db.Catalogs.create({
      catalogName,
      userId,
    });
    return res.status(201).send({ data: createdCatalog });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.getAllCatalogs = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const catalogs = await db.Catalogs.findAll({
      where: { userId },
    });
    return res.status(200).send({ data: catalogs });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};
module.exports.getCatalogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.tokenData;

    const catalog = await db.Catalogs.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!catalog) {
      return res.status(404).send('Catalog is not found');
    }
    return res.status(200).send({ data: catalog });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.deleteCatalogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.tokenData;

    const catalog = await db.Catalogs.findOne({
      where: {
        id,
        userId,
      },
    });
    if (!catalog) {
      return res.status(404).send('Catalog is not found');
    }
    await catalog.destroy();
    return res.status(204).send();
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};
