const express = require('express');
const router = express.Router();

const validateObjectId = require('./middleware/validateObjectId');
const validateBody = require('./middleware/validateBody');
const channelController = require('./controllers/channel.controller');

router.get('/', channelController.getChannels);
router.get('/:channelId', validateObjectId, channelController.getChannel);
router.get('/:channelId/users/:userId', channelController.getUserType);

router.put('/:channelId', channelController.updateChannel);
router.post('/', validateBody, channelController.createChannel);

module.exports = router;
