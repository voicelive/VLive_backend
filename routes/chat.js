const express = require('express');
const router = express.Router();

const validateObjectId = require('./middleware/validateObjectId');
const chatController = require('./controllers/chat.controller');

router.get('/:channelId', validateObjectId, chatController.getChat);
router.put('/', chatController.addChat);

module.exports = router;
