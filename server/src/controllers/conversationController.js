const db = require('../models');
const { logError } = require('../logger/logger');

module.exports.createConversation = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {
    const { userId } = req.tokenData;
    const { recipientId } = req.body;

    const conversation = await db.Conversations.create({}, { transaction });

    await db.ConversationsUsers.bulkCreate(
      [
        { conversationId: conversation.id, userId },
        { conversationId: conversation.id, userId: recipientId },
      ],
      { transaction },
    );

    await transaction.commit();

    return res.status(201).send({ data: conversation });
  } catch (err) {
    await transaction.rollback();
    logError(err, err.code);
    next(err);
  }
};

module.exports.getAllConversations = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const conversations = await db.Conversations.findAll({
      include: {
        model: db.ConversationsUsers,
        where: { userId },
      },
    });
    return res.status(200).send({ data: conversations });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};
module.exports.getConversationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversation = await db.Conversations.findByPk({
      where: { id },
      include: {
        model: db.ConversationsUsers,
        where: { userId: req.tokenData.userId },
      },
    });
    if (!conversation) {
      return res.status(404).send('Conversation is not found');
    }
    return res.status(200).send({ data: conversation });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.deleteConversationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversation = await db.Conversations.findByPk(id);
    if (!conversation) {
      return res.status(404).send('Conversation is not found');
    }
    await conversation.destroy();
    return res.status(204).send();
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};
