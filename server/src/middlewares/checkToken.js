const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const TokenError = require('../errors/TokenError');
const userQueries = require('../queries/userQueries');
const { logError } = require('../logger/logger');

module.exports.checkAuth = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return next(new TokenError('need token', 401));
  }
  try {
    const tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    });
  } catch (err) {
    next(new TokenError());
  }
};

module.exports.checkToken = async (req, res, next) => {

  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return next(new TokenError('need token', 401));
  }
  try {

    req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);

    next();
  } catch (err) {
    logError(err);
    next(new TokenError('Text', 401));
  }
};
