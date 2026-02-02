const RoomRepo = require("../repository/room-repo.js");

class RoomService {
  constructor() {
    this.repo = new RoomRepo();
  }

  async createRoom(userId) {
    return this.repo.create({
      createdby: userId,
      participants: [userId]
    });
  }

  async joinRoom(roomId, userId) {
    const room = await this.repo.findByRoomId(roomId);
    if (!room) throw new Error("Room not found");
    return this.repo.addParticipant(roomId, userId);
  }

  async getRoomsByUserId(userId) {
    return this.repo.findRoomsByUserId(userId);
  }

  async findRoom(roomId) {
    return this.repo.findRoom(roomId);
  }

  async findRoomForUser(roomId, userId) {
    return this.repo.findRoomForUser(roomId, userId);
  }
}

module.exports = RoomService;
