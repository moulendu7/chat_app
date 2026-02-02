const RoomService = require("../service/room-service.js");
const service = new RoomService();
const socketInstance = require("../socketInstance.js");

const createRoom = async (req, res) => {
  const room = await service.createRoom(req.user._id);
  res.status(201).json({ success: true, data: room });
};

async function joinRoom(req, res) {
  const room = await service.joinRoom(req.params.roomId, req.user._id);

  const io = socketInstance.get();

  io.to(room.roomId).emit("participant-updated", {
    roomId: room.roomId,
  });

  res.json({ success: true, data: room });
}

const getMyRooms = async (req, res) => {
  const rooms = await service.getRoomsByUserId(req.user._id);
  res.json({ success: true, data: rooms });
};

const findRoom = async (req, res) => {
  const room = await service.findRoom(req.params.roomId);
  if (!room) return res.status(404).json({ success: false });
  res.json({ success: true, data: room });
};

const validateRoom = async (req, res) => {
  const room = await service.findRoomForUser(req.params.roomId, req.user._id);
  if (!room) return res.status(403).json({ success: false });
  res.json({ success: true });
};

module.exports = {
  createRoom,
  joinRoom,
  getMyRooms,
  findRoom,
  validateRoom,
};
