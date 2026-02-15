const db = require('../models');
const { logError } = require('../logger/logger');


module.exports.createCatalog = async (req, res, next) => {
  try {
    const { catalogName, chatId } = req.body;
    const { userId } = req.tokenData;

    if (!catalogName) {
      return res.status(400).send('Catalog name is required');
    }

    const catalog = await db.Catalogs.create({
      catalogName,
      userId,
    });
    if (chatId) {
      await db.CatalogsConversations.create({
        catalogId: catalog.id,
        conversationId: chatId,
      });
    }

    return res.status(201).send(catalog);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { catalogId, catalogName } = req.body;
    const { userId } = req.tokenData;

    if (!catalogId) {
      return res.status(400).send('Catalog ID is required');
    }

    if (!catalogName) {
      return res.status(400).send('Catalog name is required');
    }

    const catalog = await db.Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send('Catalog not found');
    }

    catalog.catalogName = catalogName;
    await catalog.save();

    return res.status(200).send(catalog);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const { catalogId } = req.params;
    const { userId } = req.tokenData;

    if (!catalogId) {
      return res.status(400).send('Catalog ID is required');
    }

    const catalog = await db.Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send('Catalog not found');
    }

    await catalog.destroy();

    return res.status(200).send({ message: 'Catalog deleted successfully' });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;

    let catalogs = await db.Catalogs.findAll({
      where: { userId },
      include: [
        {
          model: db.Conversations,
          include: [
            {
              model: db.Users,
              as: 'users',
              attributes: [
                'id',
                'firstName',
                'lastName',
                'displayName',
                'avatar',
              ],
            },
          ],
        },
      ],
    });
    if (!catalogs || !Array.isArray(catalogs)) {
      catalogs = [];
    }

    return res.status(200).send(catalogs);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

