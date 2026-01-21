const db = require('../models');
const RightsError = require('../errors/RightsError');
const ServerError = require('../errors/ServerError');
const CONSTANTS = require('../constants');

module.exports.filterOffersByRole = (req, res, next) => {
  req.offersFilter = {};
  const { role, userId } = req.tokenData;

  if (role === CONSTANTS.MODERATOR) {
    req.offersFilter.status = 'pending';
  } else if (role === CONSTANTS.CUSTOMER) {
    req.offersFilter.status = 'approved';
  } else if (role === CONSTANTS.CREATOR) {
    req.offersFilter.userId = userId;
  }
  next();
};

module.exports.tabuCreativeInfoForModerator = (req, res, next) => {
  if (req.tokenData.role === CONSTANTS.MODERATOR) {
    req.includeUser = false;
  } else {
    req.includeUser = true;
  }
  next();
};

module.exports.pagination = (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  req.pagination = { page, limit, offset };
  next();
};

module.exports.offerIsPending = async (req, res, next) => {

  try {
    const { offerId } = req.params;
    if (!offerId) {
      return next(new RightsError('Offer ID is required'));
    }
    const offer = await db.Offers.findByPk(offerId);
    if (!offer) {
      return next(new RightsError(`Offer with ID ${offerId} not found`));
    }
    if (offer.status !== 'pending') {
      return next(new RightsError('Offer is already processed'));
    }
    req.offer = offer;
    next();
  } catch (error) {
    next(new ServerError(error));
  }
};
