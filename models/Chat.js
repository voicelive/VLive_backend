const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
  },
  chatList: [
    {
      author: {
        type: String,
        default: '',
      },
      chat: {
        type: String,
        default: '',
      },
    },
  ],
});

module.exports = mongoose.model('Chat', chatSchema);
