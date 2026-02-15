const db = require('../models');
const userQueries = require('../queries/userQueries');
const controller = require('../sockets/socketInit');
const { logError } = require('../logger/logger');


module.exports.getChat = async (req, res, next) => {
  try {
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
          as: 'conversationUsers',
          where: {
            userId: {
              [db.Sequelize.Op.in]: [userId, interlocutorId],
            },
          },
          required: true,
        },
      ],
    });

    if (conversation && conversation.conversationUsers.length === 2) {
      const messages = await db.Messages.findAll({
        where: { conversationId: conversation.id },
        order: [['createdAt', 'ASC']],
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

      const interlocutor = await getUserInfo(interlocutorId);

      return res.status(200).send({
        messages,
        interlocutor,
      });
    }
    const interlocutor = await getUserInfo(interlocutorId);
    return res.status(200).send({
      messages: [],
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


module.exports.favoriteChat = async (req, res, next) => {
  try {
    const { participants, favoriteFlag } = req.body;
    const { userId } = req.tokenData;

    if (!participants || !Array.isArray(participants) || participants.length !== 2) {
      return res.status(400).send('Participants array with 2 users is required');
    }
    if (typeof favoriteFlag !== 'boolean') {
      return res.status(400).send('FavoriteFlag boolean is required');
    }

    const otherUserId = participants.find(id => id !== userId);
    if (!otherUserId) {
      return res.status(400).send('Invalid participants');
    }


    let conversation = null;
    const userConversations = await db.ConversationsUsers.findAll({
      where: { userId },
      attributes: ['conversationId'],
    });

    if (userConversations.length > 0) {
      const conversationIds = userConversations.map(c => c.conversationId);
      const shared = await db.ConversationsUsers.findAll({
        where: {
          conversationId: { [db.Sequelize.Op.in]: conversationIds },
          userId: otherUserId,
        },
        attributes: ['conversationId'],
      });

      for (const item of shared) {
        const totalUsers = await db.ConversationsUsers.count({
          where: { conversationId: item.conversationId },
        });
        if (totalUsers === 2) {
          conversation = await db.Conversations.findByPk(item.conversationId);
          break;
        }
      }
    }

    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }

    await db.ConversationsUsers.update(
      { favoriteList: favoriteFlag },
      { where: { conversationId: conversation.id, userId } },
    );


    const updatedConversation = await db.Conversations.findByPk(conversation.id, {
      include: [
        {
          model: db.ConversationsUsers,
          as: 'conversationUsers',
          include: [{ model: db.Users, attributes: ['id'] }],
          attributes: ['blackList', 'favoriteList', 'userId'],
        },
      ],
    });

    const favoriteList = participants.map(id => {
      const convUser = updatedConversation.conversationUsers.find(cu => cu.userId === id);
      return convUser ? convUser.favoriteList : false;
    });

    const blackList = participants.map(id => {
      const convUser = updatedConversation.conversationUsers.find(cu => cu.userId === id);
      return convUser ? convUser.blackList : false;
    });

    const result = {
      id: updatedConversation.id,
      participants,
      favoriteList,
      blackList,
    };

    return res.status(200).send(result);
  } catch (err) {
    logError(err, err.code);
    next(err);
  }
};


module.exports.blackList = async (req, res, next) => {
  try {
    const { participants, blackListFlag } = req.body;
    const { userId } = req.tokenData;

    if (!participants || !Array.isArray(participants) || participants.length !== 2) {
      return res.status(400).send('Participants array with 2 users is required');
    }
    if (typeof blackListFlag !== 'boolean') {
      return res.status(400).send('BlackListFlag boolean is required');
    }

    const otherUserId = participants.find(id => id !== userId);
    if (!otherUserId) {
      return res.status(400).send('Invalid participants');
    }

    let conversation = null;
    const userConversations = await db.ConversationsUsers.findAll({
      where: { userId },
      attributes: ['conversationId'],
    });

    if (userConversations.length > 0) {
      const conversationIds = userConversations.map(c => c.conversationId);
      const shared = await db.ConversationsUsers.findAll({
        where: {
          conversationId: { [db.Sequelize.Op.in]: conversationIds },
          userId: otherUserId,
        },
        attributes: ['conversationId'],
      });

      for (const item of shared) {
        const totalUsers = await db.ConversationsUsers.count({
          where: { conversationId: item.conversationId },
        });
        if (totalUsers === 2) {
          conversation = await db.Conversations.findByPk(item.conversationId);
          break;
        }
      }
    }

    if (!conversation) {
      return res.status(404).send('Conversation not found');
    }

    await db.ConversationsUsers.update(
      { blackList: blackListFlag },
      { where: { conversationId: conversation.id, userId } },
    );

    const updatedConversation = await db.Conversations.findByPk(conversation.id, {
      include: [
        {
          model: db.ConversationsUsers,
          as: 'conversationUsers',
          include: [{ model: db.Users, attributes: ['id'] }],
          attributes: ['blackList', 'favoriteList', 'userId'],
        },
      ],
    });

    const favoriteList = participants.map(id => {
      const convUser = updatedConversation.conversationUsers.find(cu => cu.userId === id);
      return convUser ? convUser.favoriteList : false;
    });

    const blackList = participants.map(id => {
      const convUser = updatedConversation.conversationUsers.find(cu => cu.userId === id);
      return convUser ? convUser.blackList : false;
    });

    const result = {
      id: updatedConversation.id,
      participants,
      favoriteList,
      blackList,
    };

    const interlocutorId = otherUserId;
    controller.getChatController().emitChangeBlockStatus(interlocutorId, result);

    return res.status(200).send(result);
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
