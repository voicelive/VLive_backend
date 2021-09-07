const { Server } = require('socket.io');

module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT'],
    },
  });

  io.on('connection', socketHandler);
};

function socketHandler(socket) {
  console.log('socket connected...');

  socket.on('create channel', (channel) => {
    console.log(channel);
    socket.broadcast.emit('listen create channel', channel);
  });
}
