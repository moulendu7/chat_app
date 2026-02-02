const mongoose = require("mongoose");
const Room = require("../models/room.js");
const { nanoid } = require("nanoid");

class RoomRepo {
  async create(data) {
    const roomId = nanoid(8);
    return Room.create({ ...data, roomId });
  }

  async findByRoomId(roomId) {
    return Room.findOne({ roomId });
  }

  async addParticipant(roomId, userId) {
    return Room.findOneAndUpdate(
      { roomId },
      { $addToSet: { participants: userId } },
      { new: true }
    );
  }

  async findRoomsByUserId(userId) {
    return Room.find({
      $or: [
        { createdby: userId },
        { participants: userId }
      ]
    }).select("roomId participants");
  }

  async findRoom(roomId) {
    return Room.findOne({ roomId })
      .populate("participants", "name");
  }

  async findRoomForUser(roomId, userId) {
    return Room.findOne({
      roomId,
      $or: [
        { createdby: userId },
        { participants: userId }
      ]
    });
  }
}

module.exports = RoomRepo;
