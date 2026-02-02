const Chat = require("../models/chat.js");

class ChatRepo {
  async create(data) {
    return Chat.create(data);
  }

  async getByRoom(roomId) {
    return Chat.find({ roomId })
      .populate("createdBy", "name")
      .sort({ createdAt: 1 });
  }
}

module.exports = ChatRepo;
