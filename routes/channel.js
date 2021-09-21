const express = require('express');
const router = express.Router();

const validateObjectId = require('./middleware/validateObjectId');
const validateBody = require('./middleware/validateBody');
const channelController = require('./controllers/channel.controller');
const verifyToken = require('./middleware/authorization');

router.get('/', channelController.getChannels);
router.get('/:channelId', validateObjectId, channelController.getChannel);

router.put('/:channelId', verifyToken, channelController.updateChannel);
router.post('/', verifyToken, validateBody, channelController.createChannel);

module.exports = router;
