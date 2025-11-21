const { Server } = require('socket.io');
const ChatController = require('../sockets/sockets/ChatController');
const NotificationController = require('../sockets/sockets/NotificationController');

let notificationController;
let chatController;

const cors = {
  origin: '*',
};

module.exports.createConnection = (httpServer) => {
  const io = new Server(httpServer, { cors });
  notificationController = new NotificationController();
  notificationController.connect('/notifications', io);
  chatController = new ChatController();
  chatController.connect('/chat', io);
};

module.exports.getChatController = () => {
  return chatController;
};

module.exports.getNotificationController = () => {
  return notificationController;
};
