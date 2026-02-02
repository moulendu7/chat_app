const express = require('express');
const router = express.Router();

const authenticate = require('../auth/passport_authenticate.js');

const { signup, signin } = require('../controllers/user-controller.js');
const {
  createRoom,
  joinRoom,
  getMyRooms,
  findRoom,
  validateRoom
} = require('../controllers/room-controller.js');

const {
  sendMessage,
  getChats
} = require('../controllers/chat-controller.js');

router.post('/signup', signup);
router.post('/login', signin);

router.get('/me', authenticate, (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

router.post('/createroom', authenticate, createRoom);
router.post('/:roomId/join', authenticate, joinRoom);

router.get('/rooms', authenticate, getMyRooms);
router.get('/rooms/:roomId/validate', authenticate, validateRoom);
router.get('/rooms/:roomId', authenticate, findRoom);

router.post('/:roomId/sendmsg', authenticate, sendMessage);
router.get('/:roomId/getmsg', authenticate, getChats);

module.exports = router;
