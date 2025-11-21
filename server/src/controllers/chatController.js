const Conversation = require('../models/mongoModels/conversation');
const Message = require('../models/mongoModels/Message');
const Catalog = require('../models/mongoModels/Catalog');
const db = require('../models');
const userQueries = require('../queries/userQueries');
const controller = require('../socketInit');


module.exports.addMessage = async (req, res, next) => {
  try {
    const { recipient, messageBody } = req.body;
    const { userId, firstName, lastName, displayName, avatar,  email } = req.tokenData;

    const participants = [userId, recipient];
    participants.sort(
      (participant1, participant2) => participant1 - participant2);
    if(!recipient || !messageBody){
      return res.status(400).send('Bad request');
    }
    if(recipient === userId){
      return res.status(400).send('Cannot send message to yourself');
    }
    const newConversation = await Conversation.findOneAndUpdate({ participants },
      { participants, blackList: [false, false], favoriteList: [false, false] },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        useFindAndModify: false,
      });
    const message = new Message({
      sender: userId,
      body: messageBody,
      conversation: newConversation._id,
    });
    await message.save();
    message._doc.participants = participants;
    const interlocutorId = participants.filter(
      (participant) => participant !== userId)[ 0 ];
    const preview = {
      _id: newConversation._id,
      sender: userId,
      text: messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        _id: newConversation._id,
        sender: userId,
        text: messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: userId,
          firstName,
          lastName,
          displayName,
          avatar,
          email,
        },
      },
    });
    return res.status(200).send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const { interlocutorId } = req.body;
    const { userId } = req.tokenData;

    if(!interlocutorId){
      return res.status(400).send('Interlocutor is not indicated');
    }

    if(interlocutorId === userId){
      return res.status(400).send('Cannot get chat with yourself');
    }

    const participants = [userId, interlocutorId];
    participants.sort(
      (participant1, participant2) => participant1 - participant2);
    const messages = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      { $match: { 'conversationData.participants': participants } },
      { $sort: { createdAt: 1 } },
      {
        $project: {
          '_id': 1,
          'sender': 1,
          'body': 1,
          'conversation': 1,
          'createdAt': 1,
          'updatedAt': 1,
        },
      },
    ]);

    const interlocutor = await userQueries.findUser(
      { id: req.body.interlocutorId });
    return res.status(200).send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;

    if(!userId){
      return res.status(401).send('User authentication required');
    }
    const conversations = await Message.aggregate([
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationData',
        },
      },
      {
        $unwind: '$conversationData',
      },
      {
        $match: {
          'conversationData.participants': userId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $group: {
          _id: '$conversationData._id',
          sender: { $first: '$sender' },
          text: { $first: '$body' },
          createAt: { $first: '$createdAt' },
          participants: { $first: '$conversationData.participants' },
          blackList: { $first: '$conversationData.blackList' },
          favoriteList: { $first: '$conversationData.favoriteList' },
        },
      },
    ]);
    const interlocutors = [];
    conversations.forEach(conversation => {
      interlocutors.push(conversation.participants.find(
        (participant) => participant !== userId));
    });
    const senders = await db.Users.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    conversations.forEach((conversation) => {
      senders.forEach(sender => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.interlocutor = {
            id: sender.dataValues.id,
            firstName: sender.dataValues.firstName,
            lastName: sender.dataValues.lastName,
            displayName: sender.dataValues.displayName,
            avatar: sender.dataValues.avatar,
          };
        }
      });
    });
    return res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const { participants, blackListFlag } = req.body;
    const { userId } = req.tokenData;

    if(!participants || !Array.isArray(participants)){
      return res.status(400).send('Participants are required');
    }
    if(participants.length !== 2){
      return res.status(400).send('Participants must be 2');
    }
    if(typeof blackListFlag !== 'boolean'){
      return res.status(400).send('BlackListFlag boolean is required');
    }
    const predicate = 'blackList.' +
    participants.indexOf(userId);
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [ predicate ]: blackListFlag } }, { new: true });
    const interlocutorId = participants.filter(
      (participant) => participant !== userId)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
    return res.status(200).send(chat);
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const { participants, favoriteFlag } = req.body;
    const { userId } = req.tokenData;

    if(!participants || !Array.isArray(participants)){
      return res.status(400).send('Participants are required');
    }
    if(participants.length !== 2){
      return res.status(400).send('Participants must be 2');
    }
    if(typeof favoriteFlag !== 'boolean'){
      return res.status(400).send('FavoriteFlag boolean is required');
    }
    const predicate = 'favoriteList.' +
    participants.indexOf(userId);
    const chat = await Conversation.findOneAndUpdate(
      { participants },
      { $set: { [ predicate ]: favoriteFlag } }, { new: true });
    return res.status(200).send(chat);
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const { catalogName, chatId } = req.body;
    const { userId } = req.tokenData;

    if(!catalogName){
      return res.status(400).send('Catalog name is required');
    }
    if(!chatId){
      return res.status(400).send('Chat ID is required');
    }
    const catalog = new Catalog({
      userId,
      catalogName,
      chats: [chatId],
    });
    await catalog.save();
    return res.status(201).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { catalogId, catalogName } = req.body;
    const { userId } = req.tokenData;

    if(!catalogId){
      return res.status(400).send('Catalog ID is required');
    }
    if(!catalogName){
      return res.status(400).send('Catalog name is required');
    }
    const catalog = await Catalog.findOneAndUpdate({
      _id: catalogId,
      userId,
    }, { catalogName }, { new: true });
    return res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const { userId } = req.tokenData;

    if(!catalogId){
      return res.status(400).send('Catalog ID is required');
    }
    if(!chatId){
      return res.status(400).send('Chat ID is required');
    }
    const catalog = await Catalog.findOneAndUpdate({
      _id: catalogId,
      userId,
    }, { $addToSet: { chats: chatId } }, { new: true });
    return res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const { userId } = req.tokenData;

    if(!catalogId){
      return res.status(400).send('Catalog ID is required');
    }
    if(!chatId){
      return res.status(400).send('Chat ID is required');
    }
    const catalog = await Catalog.findOneAndUpdate({
      _id: catalogId,
      userId,
    }, { $pull: { chats: chatId } }, { new: true });
    return res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const { catalogId } = req.body;
    const { userId } = req.tokenData;

    if(!catalogId){
      return res.status(400).send('Catalog ID is required');
    }
    await Catalog.remove(
      { _id: catalogId, userId });
    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;

    const catalogs = await Catalog.aggregate([
      { $match: { userId } },
      {
        $project: {
          _id: 1,
          catalogName: 1,
          chats: 1,
        },
      },
    ]);
    if(!catalogs || catalogs.length === 0){
      return res.status(200).send([]);
    }
    return res.status(200).send(catalogs);
  } catch (err) {
    next(err);
  }
};
