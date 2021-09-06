const express = require('express');
const router = express.Router();
const channelController = require('./controllers/channel.controller');

router.get('/:channelId', channelController.getCannel);

module.exports = router;
