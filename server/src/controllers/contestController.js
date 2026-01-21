const fs = require('fs');
const db = require('../models');
const contestQueries = require('../queries/contestQueries');
const userQueries = require('../queries/userQueries');
const controller = require('../sockets/socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants');
const { logError } = require('../logger/logger');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const {
      body: { characteristic1, characteristic2 },
    } = req;
    if (!characteristic1 && !characteristic2) {
      return res.status(400).send('At least one characteristic is required');
    }
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean,
    );

    const characteristics = await db.Selects.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return res.status(404).send('No characteristics found');
    }
    characteristics.forEach((characteristic) => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    return res.status(200).send(response);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const { contestid } = req.headers;
    const { role, userId } = req.tokenData;

    if (!contestid) {
      return res.status(400).send('Contest ID is required');
    }
    if (isNaN(Number(contestid))) {
      return res.status(400).send('Contest ID must be a number');
    }

    let offerWhereCondition = {};
    if (role === CONSTANTS.CREATOR) {
      offerWhereCondition = { userId };
    } else if (role === CONSTANTS.CUSTOMER) {
      offerWhereCondition = {
        status: CONSTANTS.OFFER_STATUS_APPROVED };
    } else if (role === CONSTANTS.MODERATOR) {
      return res.status(403).send('Access denied');
    }

    let contestInfo = await db.Contests.findOne({
      where: { id: contestid },
      order: [[db.Offers, 'id', 'asc']],
      include: [
        {
          model: db.Users,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Offers,
          required: false,
          where: offerWhereCondition,
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.Users,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: db.Ratings,
              required: false,
              where: { userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });

    if (!contestInfo) {
      return res.status(404).send('Contest not found');
    }

    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach((offer) => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });

    return res.status(200).send(contestInfo);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};


module.exports.downloadFile = async (req, res, next) => {
  try {
    const { fileName } = req.params;

    if (!fileName) {
      return res.status(400).send('File name is required');
    }
    const file = CONSTANTS.CONTESTS_DEFAULT_DIR + fileName;
    if (!fs.existsSync(file)) {
      return res.status(404).send('File not found');
    }
    return res.status(200).download(file);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.updateContest = async (req, res, next) => {
  try {
    const { contestId, ...updateData }= req.body;
    const { userId } = req.tokenData;
    if (!contestId) {
      return res.status(400).send('Contest ID is required');
    }
    if (isNaN(Number(contestId))) {
      return res.status(400).send('Contest ID must be a number');
    }
    if (req.file) {
      updateData.fileName = req.file.filename;
      updateData.originalFileName = req.file.originalname;
    }
    const updatedContest = await contestQueries.updateContest(updateData, {
      id: contestId,
      userId,
    });
    if(!updatedContest){
      return res.status(404).send('Contest not found');
    }
    return res.status(200).send(updatedContest);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};


module.exports.setNewOffer = async (req, res, next) => {
  try {
    const { contestId, contestType, customerId } = req.body;
    if(!contestId){
      return res.status(400).send('Contest ID is required');
    }
    if(!contestType){
      return res.status(400).send('Contest type is required');
    }
    if(!customerId){
      return res.status(400).send('Customer ID is required');
    }
    const obj = {};
    if (contestType === CONSTANTS.LOGO_CONTEST) {
      if(!req.file){
        return res.status(400).send('File is required for logo contest');
      }
      obj.fileName = req.file.filename;
      obj.originalFileName = req.file.originalname;
    } else {
      obj.text = req.body.offerData;
    }
    obj.userId = req.tokenData.userId;
    obj.contestId = contestId;
    const result = await contestQueries.createOffer(obj);
    if(!result){
      return res.status(400).send('Invalid data for creating offer');
    }
    delete result.contestId;
    delete result.userId;
    controller
      .getNotificationController()
      .emitEntryCreated(customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    return res.status(200).send(Object.assign({}, result, { User }));
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId },
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId,
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction,
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(` 
          CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' 
            THEN '${CONSTANTS.CONTEST_STATUS_FINISHED}'
            WHEN "orderId"='${orderId}' 
            AND "priority"=${priority + 1} 
            THEN '${CONSTANTS.CONTEST_STATUS_ACTIVE}'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END
    `),
    },
    { orderId },
    transaction,
  );
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction,
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction,
  );
  const arrayRoomsId = [];
  updatedOffers.forEach((offer) => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of your offers WIN',
      contestId);
  return updatedOffers[0].dataValues;
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  try{
    const { command, offerId, creatorId, contestId, orderId, priority } =req.body;
    if(!command){
      return res.status(400).send('Command is required');
    }
    if(!offerId){
      return res.status(400).send('Offer ID is required');
    }
    if (command === 'reject') {
      const offer = await rejectOffer(
        offerId,
        creatorId,
        contestId,
      );
      return res.status(200).send(offer);
    } else if (command === 'resolve') {
      if (!contestId) {
        return res.status(400).send('Contest ID is required for resolve');
      }
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        contestId,
        creatorId,
        orderId,
        offerId,
        priority,
        transaction,
      );
      await transaction.commit();
      return res.status(200).send(winningOffer);
    }else {
      return res.status(400).send('Invalid command');
    }
  }catch(err){
    logError(err, err.code);
    if (transaction) {
      await transaction.rollback();
    }
    next(err);
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  try{
    const { status, limit, offset } =req.query;
    const { userId } = req.tokenData;

    if(!userId){
      return res.status(401).send('User is required');
    }

    if(limit && (isNaN(Number(limit)) || Number(limit) <= 0)){
      return res.status(400).send('Limit must be a positive number');
    }
    const contests = await db.Contests.findAll({
      where: { status, userId },
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : 0,
      order: [['id', 'DESC']],
      include: [
        {
          model: db.Offers,
          required: false,
          attributes: ['id'],
        },
      ],
    });
    contests.forEach(
      (contest) =>
        (contest.dataValues.count = contest.dataValues.Offers.length),
    );

    let haveMore = false;
    if (limit) {
      haveMore = contests.length === Number(limit);
    }
    return res.status(200).send({ contests, haveMore });
  }catch(err){
    logError(err, err.code);
    next(err);
  }
};

module.exports.getContests = async(req, res, next) => {
  try{
    if(!req.tokenData || !req.tokenData.userId){
      return res.status(401).send('User is required');
    }
    const { typeIndex, contestId, industry, awardSort, limit, offset, ownEntries } = req.query;
    if(limit && (isNaN(Number(limit)) || Number(limit) <= 0)){
      return res.status(400).send('Limit must be a positive number');
    }
    const predicates = await UtilFunctions.createWhereForAllContests(
      typeIndex,
      contestId,
      industry,
      awardSort,
    );
    const contests = await db.Contests.findAll({
      where: predicates.where,
      order: predicates.order,
      limit: limit ? Number(limit) : 10,
      offset: offset ? Number(offset) : 0,
      include: [
        {
          model: db.Offers,
          required: false,
          where: ownEntries ? { userId: req.tokenData.userId } : {},
          attributes: ['id'],
        },
      ],
    });
    contests.forEach(
      (contest) =>
        (contest.dataValues.count = contest.dataValues.Offers.length),
    );

    let haveMore = false;
    if (limit) {
      haveMore = contests.length === Number(limit);
    }
    return res.status(200).send({ contests, haveMore });
  }catch(err){
    logError(err, err.code);
    next(err);
  }
};
