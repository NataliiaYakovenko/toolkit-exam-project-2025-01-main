const db = require('../models');
const controller = require('../sockets/socketInit');
const { logError } = require('../logger/logger');

module.exports.addMessage = async (req, res, next) => {
  try {
    const { recipient, messageBody } = req.body;
    const { userId, firstName, lastName, displayName, avatar } = req.tokenData;

    if (!recipient || !messageBody) {
      return res.status(400).send('Bad request');
    }
    if (recipient === userId) {
      return res.status(400).send('Cannot send message to yourself');
    }
    let conversation = await db.Conversations.findOne({
      include: [
        {
          model: db.ConversationsUsers,
          as: 'conversationUsers',
          required: true,
          where: {
            userId: {
              [db.Sequelize.Op.in]: [userId, recipient],
            },
          },
        },
      ],
    });

    if (conversation) {
      const totalUsersInChat = await db.ConversationsUsers.count({
        where: { conversationId: conversation.id },
      });

      if (totalUsersInChat !== 2) {
        conversation = null;
      }
    }
    const now = new Date();
    if (!conversation) {
      conversation = await db.Conversations.create({
        createdAt: now,
        updatedAt: now,
      });

      await db.ConversationsUsers.bulkCreate([
        {
          conversationId: conversation.id,
          userId,
          blackList: false,
          favoriteList: false,
        },
        {
          conversationId: conversation.id,
          userId: recipient,
          blackList: false,
          favoriteList: false,
        },
      ]);
    }

    const message = await db.Messages.create({
      conversationId: conversation.id,
      sender: userId,
      body: messageBody,
      createdAt: now,
      updatedAt: now,
    });

    const fullMessage = await db.Messages.findByPk(message.id, {
      include: [
        {
          model: db.Users,
          attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
        },
      ],
    });

    const participants = [userId, recipient];
    const preview = {
      id: conversation.id,
      sender: userId,
      text: messageBody,
      createAt: message.createdAt,
      participants,
      blackList: [false, false],
      favoriteList: [false, false],
      interlocutor: {
        id: recipient,
        firstName: req.body.interlocutor?.firstName || '',
        lastName: req.body.interlocutor?.lastName || '',
        displayName: req.body.interlocutor?.displayName || '',
        avatar: req.body.interlocutor?.avatar || '',
      },
    };

    controller.getChatController().emitNewMessage(recipient, {
      message: fullMessage,
      preview: {
        ...preview,
        interlocutor: {
          id: userId,
          firstName,
          lastName,
          displayName,
          avatar,
        },
      },
    });

    return res.status(200).send({
      message: fullMessage,
      preview,
    });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};
