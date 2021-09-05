const mongoose = require('mongoose');
const { databaseURL } = require('../configs');
const { mongodbMessage } = require('../constants/constant');

function connectMongoDB() {
  const db = mongoose.connection;
  mongoose.connect(databaseURL);

  db.on('error', function (err) {
    console.log(mongodbMessage.DISCONNECT);
    mongoose.disconnect();
  });

  db.once('open', function () {
    console.log(mongodbMessage.CONNECT);
  });
}

module.exports = connectMongoDB;
