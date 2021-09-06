const express = require('express');
const router = express.Router();

const episodeController = require('./controllers/episode.controller');

router.get('/', episodeController.getEpisodes);

module.exports = router;
