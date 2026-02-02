const ChatService = require("../service/chat-service.js");
const service = new ChatService();

const sendMessage = async (req, res) => {
  const chat = await service.createMessage({
    roomId: req.params.roomId,
    userId: req.user._id,
    message: req.body.text
  });

  await chat.populate("createdBy", "name");

  res.status(201).json({
    _id: chat._id,
    chatId: chat.chatId,
    roomId: chat.roomId,
    message: chat.message,
    username: chat.createdBy.name,
    createdAt: chat.createdAt
  });
};

const getChats = async (req, res) => {
  const chats = await service.getRoomChats(req.params.roomId);

  res.json(
    chats.map(c => ({
      _id: c._id,
      chatId: c.chatId,
      roomId: c.roomId,
      message: c.message,
      username: c.createdBy.name,
      createdAt: c.createdAt
    }))
  );
};

module.exports = { sendMessage, getChats };
