const Conversation = require('../models/mongoModels/conversation');
const Message = require('../models/mongoModels/Message');
const Catalog = require('../models/mongoModels/Catalog');
const db = require('../models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');


module.exports.addMessage = async (req, res, next) => {
  try {
    const participants = [req.tokenData.userId, req.body.recipient];
    participants.sort(
      (participant1, participant2) => participant1 - participant2);
    if(!req.body.recipient || !req.body.messageBody){
      return res.status(400).send('Bad request');
    }
    if(req.body.recipient === req.tokenData.userId){
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
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: newConversation._id,
    });
    await message.save();
    message._doc.participants = participants;
    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    const preview = {
      _id: newConversation._id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: newConversation.blackList,
      favoriteList: newConversation.favoriteList,
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview: {
        _id: newConversation._id,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants,
        blackList: newConversation.blackList,
        favoriteList: newConversation.favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
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
    if(!req.body.interlocutorId){
      return res.status(400).send('Interlocutor is not indicated');
    }

    if(req.body.interlocutorId === req.tokenData.userId){
      return res.status(400).send('Cannot get chat with yourself');
    }

    const participants = [req.tokenData.userId, req.body.interlocutorId];
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
    if(!req.tokenData || !req.tokenData.userId){
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
          'conversationData.participants': req.tokenData.userId,
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
        (participant) => participant !== req.tokenData.userId));
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
    if(!req.body.participants || !Array.isArray(req.body.participants)){
      return res.status(400).send('Participants are required');
    }
    if(req.body.participants.length !== 2){
      return res.status(400).send('Participants must be 2');
    }
    if(typeof req.body.blackListFlag !== 'boolean'){
      return res.status(400).send('BlackListFlag boolean is required');
    }
    const predicate = 'blackList.' +
    req.body.participants.indexOf(req.tokenData.userId);
    const chat = await Conversation.findOneAndUpdate(
      { participants: req.body.participants },
      { $set: { [ predicate ]: req.body.blackListFlag } }, { new: true });
    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId)[ 0 ];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
    return res.status(200).send(chat);
  } catch (err) {
    next(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    if(!req.body.participants || !Array.isArray(req.body.participants)){
      return res.status(400).send('Participants are required');
    }
    if(req.body.participants.length !== 2){
      return res.status(400).send('Participants must be 2');
    }
    if(typeof req.body.favoriteFlag !== 'boolean'){
      return res.status(400).send('FavoriteFlag boolean is required');
    }
    const predicate = 'favoriteList.' +
    req.body.participants.indexOf(req.tokenData.userId);
    const chat = await Conversation.findOneAndUpdate(
      { participants: req.body.participants },
      { $set: { [ predicate ]: req.body.favoriteFlag } }, { new: true });
    return res.status(200).send(chat);
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    if(!req.body.catalogName){
      return res.status(400).send('Catalog name is required');
    }
    if(!req.body.chatId){
      return res.status(400).send('Chat ID is required');
    }
    const catalog = new Catalog({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
      chats: [req.body.chatId],
    });
    await catalog.save();
    return res.status(201).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    if(!req.body.catalogId){
      return res.status(400).send('Catalog ID is required');
    }
    if(!req.body.catalogName){
      return res.status(400).send('Catalog name is required');
    }
    const catalog = await Catalog.findOneAndUpdate({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    }, { catalogName: req.body.catalogName }, { new: true });
    return res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    if(!req.body.catalogId){
      return res.status(400).send('Catalog ID is required');
    }
    if(!req.body.chatId){
      return res.status(400).send('Chat ID is required');
    }
    const catalog = await Catalog.findOneAndUpdate({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    }, { $addToSet: { chats: req.body.chatId } }, { new: true });
    return res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    if(!req.body.catalogId){
      return res.status(400).send('Catalog ID is required');
    }
    if(!req.body.chatId){
      return res.status(400).send('Chat ID is required');
    }
    const catalog = await Catalog.findOneAndUpdate({
      _id: req.body.catalogId,
      userId: req.tokenData.userId,
    }, { $pull: { chats: req.body.chatId } }, { new: true });
    return res.status(200).send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    if(!req.body.catalogId){
      return res.status(400).send('Catalog ID is required');
    }
    await Catalog.remove(
      { _id: req.body.catalogId, userId: req.tokenData.userId });
    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalog.aggregate([
      { $match: { userId: req.tokenData.userId } },
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
