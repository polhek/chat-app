const { Socket } = require('socket.io');
const { InMemorySessionStore } = require('./sessionStore');
const sessionStore = new InMemorySessionStore();
const crypto = require('crypto');
const randomId = () => crypto.randomBytes(8).toString('hex');

let io;

exports.socketConnection = (server) => {
  io = require('socket.io')(server, {
    transports: ['websocket', 'polling', 'flashsocket'],
    cors: {
      origin: 'http://localhost:3000',
    },
  });
};

exports.userAuth = () => {
  io.use((socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;

    // find existing session
    if (sessionID) {
      const session = sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.userName = session.userName;
        return next();
      }
    }

    const userName = socket.handshake.auth.userName;

    if (!userName) {
      return next(new Error('invalid username'));
    }
    socket.sessionID = randomId();
    socket.userID = randomId();
    socket.userName = userName;
    next();
  });
};

exports.onConnection = () => {
  // save session and persist it

  io.on('connection', (socket) => {
    sessionStore.saveSession(socket.sessionID, {
      userID: socket.userID,
      userName: socket.userName,
      connected: true,
    });

    console.log(sessionStore);

    console.log('emit', socket.sessionID);

    socket.emit('session', {
      sessionID: socket.sessionID,
      userID: socket.userID,
      userName: socket.userName,
    });

    console.log('emit end');

    socket.join(socket.userID);

    const users = [];

    sessionStore.findAllSessions().forEach((session) => {
      users.push({
        userID: session.userID,
        userName: session.userName,
        connected: session.connected,
      });
    });
    console.log(users);

    socket.emit('users', users);

    socket.broadcast.emit('user-connected', {
      userID: socket.userID,
      userName: socket.userName,
      connected: true,
    });

    socket.on('private-message', ({ message, to }) => {
      socket.to(to).to(socket.userID).emit('private message', {
        message,
        from: socket.userID,
        to,
      });
    });

    socket.on('disconnect', async () => {
      console.log(`User socket ${socket.id} has disconnected!`);
      const matchSocket = await io.in(socket.userID).allSockets();

      const isDisconnected = matchSocket.size === 0;
      if (isDisconnected) {
        console.log(socket.userID);
        socket.broadcast.emit('user-disconnected', socket.userID);

        sessionStore.saveSession(socket.sessionID, {
          userID: socket.userID,
          userName: socket.userName,
          connected: false,
        });
      }
    });
  });
};
