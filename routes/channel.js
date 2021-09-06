const express = require('express');
const router = express.Router();
const channelController = require('./controllers/channel.controller');

router.get('/', channelController.getChannels);
router.get('/:channelId', channelController.getChannel);

module.exports = router;
