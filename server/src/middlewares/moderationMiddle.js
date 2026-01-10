const RightsError = require('../errors/RightsError');
const CONSTANTS = require('../constants');

module.exports.onlyForModerator = (req, res, next) => {
  if (req.tokenData.role !== CONSTANTS.MODERATOR) {
    return next(new RightsError('This page only for moderator'));
  }
  next();
};


