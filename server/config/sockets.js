const { Socket } = require('socket.io');

let io;

exports.socketConnection = (server) => {
  io = require('socket.io')(server, {
    transports: ['websocket', 'polling', 'flashsocket'],
    cors: {
      origin: 'http://localhost:3000',
    },
  });

  io.on('connection', (socket) => {
    console.log('User is connected!');

    socket.on('disconnect', async () => {
      console.log(`User socket ${socket.id} has disconnected!`);
      const matchSocket = await io.in(socket.id).allSockets();

      const isDisconnected = matchSocket.size === 0;
      if (isDisconnected) {
        socket.broadcast.emit('user-disconnected', socket.id);
      }
    });
  });
};

exports.userAuth = () => {
  io.use((socket, next) => {
    const userName = socket.handshake.auth.userName;

    if (!userName) {
      return next(new Error('invalid username'));
    }
    socket.userName = userName;
    next();
  });
};

exports.onConnection = () => {
  io.on('connection', (socket) => {
    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userID: id,
        userName: socket.userName,
        messages: [],
        self: false,
        connected: true,
      });
    }
    socket.emit('users', users);

    socket.on('private-message', ({ message, to }) => {
      console.log(message);
      socket.to(to).emit('private message', {
        message,
        from: socket.id,
      });
    });
  });
};

exports.notifyUsers = () => {
  io.on('connection', (socket) => {
    socket.broadcast.emit('user-connected', {
      userID: socket.id,
      userName: socket.userName,
      messages: [],
      self: false,
      connected: true,
    });
  });
};
