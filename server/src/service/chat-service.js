const { v4: uuid } = require("uuid");
const ChatRepo = require("../repository/chat-repo.js");

class ChatService {
  constructor() {
    this.repo = new ChatRepo();
  }

  async createMessage({ roomId, userId, message }) {
    return this.repo.create({
      chatId: uuid(),
      roomId,
      createdBy: userId,
      message
    });
  }

  async getRoomChats(roomId) {
    return this.repo.getByRoom(roomId);
  }
}

module.exports = ChatService;
