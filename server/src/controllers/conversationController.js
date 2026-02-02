const db = require('../models');
const { logError } = require('../logger/logger');

module.exports.createConversation = async (req, res, next) => {
  try {
    const createdConversation = await db.Conversations.create();
    return res.status(201).send({ data: createdConversation });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.getAllConversations = async (req, res, next) => {
  try {
    const conversations = await db.Conversations.findAll();
    return res.status(200).send({ data: conversations });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};
module.exports.getConversationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversation = await db.Conversations.findByPk(id);
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
