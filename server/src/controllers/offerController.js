const db = require('../models');
const CONSTANTS = require('../constants');
const { logError } = require('../logger/logger');

module.exports.getOffers = async (req, res, next) => {
  try {
    const { pagination, offersFilter, includeUser } = req;
    const { limit, offset, page } = pagination;

    const include = [
      {
        model: db.Contest,
        attributes: ['id', 'contestType', 'title', 'prize', 'status'],
      },
    ];

    if (includeUser) {
      include.push({
        model: db.User,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'displayName',
          'email',
          'avatar',
        ],
      });
    }

    const countOffers = await db.Offer.count({
      where: offersFilter,
    });

    const foundOffers = await db.Offer.findAll({
      where: offersFilter,
      limit,
      offset,
      include,
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).send({
      offers: foundOffers,
      total: countOffers,
      page,
      totalPages: Math.ceil(countOffers / limit),
    });
  } catch (error) {
    logError(error, error.code);
    next(error);
  }
};

module.exports.moderateOffer = async (req, res, next) => {
  let transaction;

  try {
    const { offerId } = req.params;
    const { status } = req.body;
    const { role } = req.tokenData;

    if (!offerId) {
      return res.status(400).send('Offer ID is required');
    }

    if (!status) {
      return res.status(400).send('Status is required');
    }

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).send('Status must be "approved" or "rejected"');
    }

    if (role !== CONSTANTS.MODERATOR) {
      return res.status(403).send('Only moderator can moderate offers');
    }

    transaction = await db.sequelize.transaction();

    const foundOffer = await db.Offer.findByPk(offerId, {
      include: [
        {
          model: db.User,
          attributes: ['id', 'email', 'firstName', 'displayName'],
        },
        {
          model: db.Contest,
          attributes: ['id', 'title', 'contestType'],
        },
      ],
      transaction,
    });

    if (!foundOffer) {
      await transaction.rollback();
      return res.status(404).send('Offer not found');
    }

    if (foundOffer.status !== 'pending') {
      await transaction.rollback();
      return res.status(400).send('Offer already moderated');
    }

    await foundOffer.update(
      { status },
      { transaction },
    );

    await transaction.commit();

    return res.status(200).send({
      message: `Offer ${status} successfully`,
      offer: { id: foundOffer.id, status: foundOffer.status },
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    logError(error, error.code);
    next(error);
  }
};
