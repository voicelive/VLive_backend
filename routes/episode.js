const express = require('express');
const router = express.Router();

const validateObjectId = require('./middleware/validateObjectId');
const episodeController = require('./controllers/episode.controller');
const verifyToken = require('./middleware/authorization');

router.get('/', episodeController.getEpisodes);
router.get(
  '/:episodeId',
  verifyToken,
  validateObjectId,
  episodeController.getEpisode,
);

module.exports = router;
