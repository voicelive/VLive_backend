const express = require('express');
const router = express.Router();

const validateObjectId = require('./middleware/validateObjectId');
const episodeController = require('./controllers/episode.controller');

router.get('/', episodeController.getEpisodes);
router.get('/:episodeId', validateObjectId, episodeController.getEpisode);

module.exports = router;
