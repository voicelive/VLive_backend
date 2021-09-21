const express = require('express');
const router = express.Router();

const validateObjectId = require('./middleware/validateObjectId');
const chatController = require('./controllers/chat.controller');
const verifyToken = require('./middleware/authorization');

router.get(
  '/:channelId',
  verifyToken,
  validateObjectId,
  chatController.getChat,
);
router.put('/', verifyToken, chatController.addChat);

module.exports = router;
