const db = require('../models');
const userQueries = require('../queries/userQueries');
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
          model: db.Users,
          where: { id: [userId, recipient] },
          attributes: [],
          through: { attributes: [] },
          required: true,
        },
      ],
      group: ['Conversations.id'],
      having: db.sequelize.literal('COUNT(DISTINCT "Users"."id") = 2'),
    });

    if (!conversation) {
      conversation = await db.Conversations.create();

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

module.exports.getChat = async (req, res, next) => {
  try {
    // logError(222, 'getChat');
    const { interlocutorId } = req.query;
    const { userId } = req.tokenData;

    if (!interlocutorId) {
      return res.status(400).send('Interlocutor is not indicated');
    }

    if (interlocutorId === userId) {
      return res.status(400).send('Cannot get chat with yourself');
    }

    const conversation = await db.Conversations.findOne({

      include: [
        {
          model: db.ConversationsUsers,
          where: {
            userId: [userId, interlocutorId],
          },
          required: true,
        },
      ],

      group: ['Conversations.id'],
      having: db.sequelize.literal(
        'COUNT(DISTINCT "ConversationsUsers"."userId") = 2',
      ),
    });

    if (!conversation) {
      const interlocutor = await getUserInfo(interlocutorId);
      return res.status(200).send({
        messages: [],
        interlocutor,
      });
    }

    const messages = await db.Messages.findAll({
      where: { conversationId: conversation.id },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: db.Users,
          attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
        },
      ],
    });

    const interlocutor = await getUserInfo(interlocutorId);

    return res.status(200).send({
      messages,
      interlocutor,
    });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

async function getUserInfo(userId) {
  const user = await userQueries.findUser({ id: userId });
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    id: user.id,
    avatar: user.avatar,
  };
}

module.exports.getPreview = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;

    if (!userId) {
      return res.status(401).send('User authentication required');
    }

    const conversationsUsers = await db.ConversationsUsers.findAll({
      where: { userId },
      include: [
        {
          model: db.Conversations,
          include: [
            {
              model: db.Messages,
              order: [['createdAt', 'DESC']],
              limit: 1,
              include: [
                {
                  model: db.Users,
                  attributes: ['id'],
                },
              ],
            },
          ],
        },
      ],
    });

    const previews = [];

    for (const conversationUser of conversationsUsers) {
      const conversation = conversationUser.Conversation;

      if (conversation.Messages.length > 0) {
        const lastMessage = conversation.Messages[0];

        const otherUser = await db.ConversationsUsers.findOne({
          where: {
            conversationId: conversation.id,
            userId: { [db.Sequelize.Op.ne]: userId },
          },
          include: [
            {
              model: db.Users,
              attributes: [
                'id',
                'firstName',
                'lastName',
                'displayName',
                'avatar',
              ],
            },
          ],
        });

        previews.push({
          id: conversation.id,
          sender: lastMessage.sender,
          text: lastMessage.body,
          createAt: lastMessage.createdAt,
          participants: [userId, otherUser?.User?.id],
          blackList: [
            conversationUser.blackList,
            otherUser?.blackList || false,
          ],
          favoriteList: [
            conversationUser.favoriteList,
            otherUser?.favoriteList || false,
          ],
          interlocutor: otherUser?.User
            ? {
              id: otherUser.User.id,
              firstName: otherUser.User.firstName,
              lastName: otherUser.User.lastName,
              displayName: otherUser.User.displayName,
              avatar: otherUser.User.avatar,
            }
            : null,
        });
      }
    }
    previews.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));

    return res.status(200).send(previews);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const { participants, blackListFlag } = req.body;
    const { userId } = req.tokenData;

    if (
      !participants ||
      !Array.isArray(participants) ||
      participants.length !== 2
    ) {
      return res
        .status(400)
        .send('Participants array with 2 users is required');
    }

    if (typeof blackListFlag !== 'boolean') {
      return res.status(400).send('BlackListFlag boolean is required');
    }

    const conversation = await db.Conversations.findOne({
      include: [
        {
          model: db.Users,
          where: { id: participants },
          attributes: [],
          through: { attributes: [] },
          required: true,
        },
      ],
      group: ['Conversations.id'],
      having: db.sequelize.literal('COUNT(DISTINCT "Users"."id") = 2'),
    });

    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }

    await db.ConversationsUsers.update(
      { blackList: blackListFlag },
      {
        where: {
          conversationId: conversation.id,
          userId,
        },
      },
    );

    const updatedConversation = await db.Conversations.findByPk(
      conversation.id,
      {
        include: [
          {
            model: db.Users,
            attributes: ['id'],
            through: { attributes: ['blackList', 'favoriteList'] },
          },
        ],
      },
    );

    const interlocutorId = participants.find((id) => id !== userId);
    controller
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, updatedConversation);

    return res.status(200).send(updatedConversation);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const { participants, favoriteFlag } = req.body;
    const { userId } = req.tokenData;

    if (
      !participants ||
      !Array.isArray(participants) ||
      participants.length !== 2
    ) {
      return res
        .status(400)
        .send('Participants array with 2 users is required');
    }

    if (typeof favoriteFlag !== 'boolean') {
      return res.status(400).send('FavoriteFlag boolean is required');
    }
    const conversation = await db.Conversations.findOne({
      include: [
        {
          model: db.Users,
          where: { id: participants },
          attributes: [],
          through: { attributes: [] },
          required: true,
        },
      ],
      group: ['Conversations.id'],
      having: db.sequelize.literal('COUNT(DISTINCT "Users"."id") = 2'),
    });

    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }

    await db.ConversationsUsers.update(
      { favoriteList: favoriteFlag },
      {
        where: {
          conversationId: conversation.id,
          userId,
        },
      },
    );

    const updatedConversation = await db.Conversations.findByPk(
      conversation.id,
      {
        include: [
          {
            model: db.Users,
            attributes: ['id'],
            through: { attributes: ['blackList', 'favoriteList'] },
          },
        ],
      },
    );

    return res.status(200).send(updatedConversation);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const { catalogName, chatId } = req.body;
    const { userId } = req.tokenData;

    if (!catalogName) {
      return res.status(400).send('Catalog name is required');
    }

    const catalog = await db.Catalogs.create({
      catalogName,
      userId,
    });
    if (chatId) {
      await db.CatalogsConversations.create({
        catalogId: catalog.id,
        conversationId: chatId,
      });
    }

    return res.status(201).send(catalog);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { catalogId, catalogName } = req.body;
    const { userId } = req.tokenData;

    if (!catalogId) {
      return res.status(400).send('Catalog ID is required');
    }

    if (!catalogName) {
      return res.status(400).send('Catalog name is required');
    }

    const catalog = await db.Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send('Catalog not found');
    }

    catalog.catalogName = catalogName;
    await catalog.save();

    return res.status(200).send(catalog);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const { userId } = req.tokenData;

    if (!catalogId) {
      return res.status(400).send('Catalog ID is required');
    }

    if (!chatId) {
      return res.status(400).send('Chat ID is required');
    }
    const catalog = await db.Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send('Catalog not found');
    }

    await db.CatalogsConversations.create({
      catalogId,
      conversationId: chatId,
    });

    const updatedCatalog = await db.Catalogs.findByPk(catalogId, {
      include: [
        {
          model: db.Conversations,
        },
      ],
    });

    return res.status(200).send(updatedCatalog);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const { userId } = req.tokenData;

    if (!catalogId) {
      return res.status(400).send('Catalog ID is required');
    }

    if (!chatId) {
      return res.status(400).send('Chat ID is required');
    }

    const catalog = await db.Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send('Catalog not found');
    }

    await db.CatalogsConversations.destroy({
      where: {
        catalogId,
        conversationId: chatId,
      },
    });

    const updatedCatalog = await db.Catalogs.findByPk(catalogId, {
      include: [
        {
          model: db.Conversations,
        },
      ],
    });

    return res.status(200).send(updatedCatalog);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const { catalogId } = req.body;
    const { userId } = req.tokenData;

    if (!catalogId) {
      return res.status(400).send('Catalog ID is required');
    }

    const catalog = await db.Catalogs.findOne({
      where: {
        id: catalogId,
        userId,
      },
    });

    if (!catalog) {
      return res.status(404).send('Catalog not found');
    }

    await catalog.destroy();

    return res.status(200).send({ message: 'Catalog deleted successfully' });
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;

    const catalogs = await db.Catalogs.findAll({
      where: { userId },
      include: [
        {
          model: db.Conversations,
          include: [
            {
              model: db.Users,
              attributes: [
                'id',
                'firstName',
                'lastName',
                'displayName',
                'avatar',
              ],
            },
          ],
        },
      ],
    });

    return res.status(200).send(catalogs);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};


