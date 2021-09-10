const express = require('express');
const router = express.Router();

const chatController = require('./controllers/chat.controller');

router.get('/:channelId', chatController.getChat);
router.put('/', chatController.addChat);

module.exports = router;
