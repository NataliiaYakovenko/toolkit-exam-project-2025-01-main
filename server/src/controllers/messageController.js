const db = require('../models');
const { logError } = require('../logger/logger');

module.exports.createMessage = async (req, res, next) => {
  try {
    const { conversationId, body } = req.body;
    const sender = req.tokenData.userId;
    const createdMessage = await db.Messages.create({
      conversationId,
      body,
      sender,
    });
    return res.status(201).send({ data: createdMessage });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.getAllMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.tokenData;

    const participant = await db.ConversationsUsers.findOne({
      where: {
        conversationId,
        userId,
      },
    });

    if (!participant) {
      return res.status(403).send('Access denied');
    }

    const messages = await db.Messages.findAll({
      where: { conversationId },
      order: [['createdAt', 'ASC']],
    });

    return res.status(200).send({ data: messages });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};


module.exports.getMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await db.Messages.findByPk(id);
    if (!message) {
      return res.status(404).send('Message is not found');
    }
    return res.status(200).send({ data: message });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.deleteMessageById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const message = await db.Messages.findByPk(id);
    if (!message) {
      return res.status(404).send('Message is not found');
    }
    await message.destroy();
    return res.status(204).send();
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};
