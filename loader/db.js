const mongoose = require('mongoose');
const { databaseURL } = require('../configs');

function connectMongoDB() {
  const db = mongoose.connection;
  mongoose.connect(databaseURL);

  db.on('error', function (err) {
    console.log('Disconnected to database...');
    mongoose.disconnect();
  });

  db.once('open', function () {
    console.log('Connected to database...');
  });
}

module.exports = connectMongoDB;
