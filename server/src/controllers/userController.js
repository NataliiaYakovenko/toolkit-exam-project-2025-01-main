const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const bd = require('../models');
const User = require('../models');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const moment = require('moment');
const { v4: uuid } = require('uuid');
const controller = require('../sockets/socketInit');
const userQueries = require('../queries/userQueries');
const bankQueries = require('../queries/bankQueries');
const ratingQueries = require('../queries/ratingQueries');

module.exports.login = async (req, res, next) => {
  try {
    const { email, password }=req.body;
    if(!email || !password){
      return res.status(400).send('Email and password are required');
    }
    const foundUser = await userQueries.findUser({ email });
    if(!foundUser){
      return res.status(401).send('Email or password are invalid');
    }
    await userQueries.passwordCompare(password, foundUser.password);
    const accessToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        userId: foundUser.id,
        role: foundUser.role,
        lastName: foundUser.lastName,
        avatar: foundUser.avatar,
        displayName: foundUser.displayName,
        balance: foundUser.balance,
        email: foundUser.email,
        rating: foundUser.rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME },
    );
    await userQueries.updateUser({ accessToken }, foundUser.id);
    return res.status(200).send({ token: accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports.registration = async (req, res, next) => {
  try {
    const newUser = await userQueries.userCreation(
      Object.assign(req.body, { password: req.hashPass }),
    );
    if(!newUser){
      return res.status(500).send('User registration failed');
    }
    const accessToken = jwt.sign(
      {
        firstName: newUser.firstName,
        userId: newUser.id,
        role: newUser.role,
        lastName: newUser.lastName,
        avatar: newUser.avatar,
        displayName: newUser.displayName,
        balance: newUser.balance,
        email: newUser.email,
        rating: newUser.rating,
      },
      CONSTANTS.JWT_SECRET,
      { expiresIn: CONSTANTS.ACCESS_TOKEN_TIME },
    );
    await userQueries.updateUser({ accessToken }, newUser.id);
    return res.status(201).send({ token: accessToken });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      next(new NotUniqueEmail());
    } else {
      next(err);
    }
  }
};

function getQuery(offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () =>
    ratingQueries.createRating(
      {
        offerId,
        mark,
        userId,
      },
      transaction,
    );
  const getUpdateQuery = () =>
    ratingQueries.updateRating({ mark }, { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  try {
    const { isFirst, offerId, mark, creatorId } = req.body;
    const userId = req.tokenData.userId;
    if(!offerId || !mark || !creatorId){
      return res.status(400).send('Missing required fields');
    }
    if(userId === creatorId){
      return res.status(403).send('Users cannot rate their own offers');
    }
    if(typeof mark !== 'number'){
      return res.status(400).send('Mark must be a number');
    }
    if(mark <= 0){
      return res.status(400).send('Mark cannot be negative number');
    }
    transaction = await bd.sequelize.transaction({
      isolationLevel:
        bd.Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await bd.Ratings.findAll({
      include: [
        {
          model: bd.Offers,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[i].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    return res.status(200).send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  let transaction;
  try {
    const  { number, cvc, expiry, price, contests } = req.body;
    if(!number || !cvc || !expiry || !price || !contests){
      return res.status(400).send('Missing required fields');
    }
    transaction = await bd.sequelize.transaction();
    await bankQueries.updateBankBalance(
      {
        balance: bd.sequelize.literal(`
             CASE
               WHEN "cardNumber"='${number.replace(/ /g, '')}'
                 AND "cvc"='${cvc}' 
                 AND "expiry"='${expiry}'
               THEN "balance"-${price}
               WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' 
                 AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}' 
                 AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
               THEN "balance"+${price} 
             END`),
      },
      {
        cardNumber: {
          [bd.Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            number.replace(/ /g, ''),
          ],
        },
      },
      transaction,
    );
    const orderId = uuid();
    contests.forEach((contest, index) => {
      const prize =
        index === contests.length - 1
          ? Math.ceil(price / contests.length)
          : Math.floor(price / contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await bd.Contests.bulkCreate(req.body.contests, transaction);
    transaction.commit();
    return res.status(200).send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const updatedUser = await userQueries.updateUser(
      req.body,
      req.tokenData.userId,
    );
    if(!updatedUser){
      return res.status(404).send('User not found');
    }
    return res.status(200).send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  try {
    const { number, expiry, cvc, sum } = req.body;
    const { userId }=req.tokenData;
    if(!number || !expiry || !cvc || !sum){
      return res.status(400).send('Missing required fields');
    }
    transaction = await bd.sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: bd.sequelize.literal('balance - ' + sum) },
      userId,
      transaction,
    );
    await bankQueries.updateBankBalance(
      {
        balance: bd.sequelize.literal(`
          CASE 
                WHEN "cardNumber"='${number.replace(/ /g, '')}'
                  AND "expiry"='${expiry}'
                  AND "cvc"='${cvc}'
                THEN "balance"+${sum}
                WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}'
                  AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
                  AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
                THEN "balance"-${sum}
          END`),
      },
      {
        cardNumber: {
          [bd.Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            number.replace(/ /g, ''),
          ],
        },
      },
      transaction,
    );
    transaction.commit();
    return res.status(200).send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.getUserByPk = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const foundUser = await User.findByPk(userId);
    if (!foundUser) {
      return res.status(404).send('User not found');
    }
    return res.status(200).send(foundUser);
  } catch (error) {
    next(error);
  }
};
