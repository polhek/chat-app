const { Socket } = require('socket.io');
const { InMemorySessionStore } = require('./sessionStore');
const { InMemoryMessageStore } = require('./messageStore');
const crypto = require('crypto');

const randomId = () => crypto.randomBytes(8).toString('hex');

let io;

const sessionStore = new InMemorySessionStore();
const messageStore = new InMemoryMessageStore();

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
    // save messages and persist them between sessions...
    const messagesUser = new Map();

    messageStore.findMessagesForUser(socket.userID).forEach((m) => {
      const { from, to } = m;
      const otherUser = socket.userID === from ? to : from;

      if (messagesUser.has(otherUser)) {
        messagesUser.get(otherUser).push(m);
      } else {
        messagesUser.set(otherUser, [m]);
      }
    });

    sessionStore.findAllSessions().forEach((session) => {
      users.push({
        userID: session.userID,
        userName: session.userName,
        connected: session.connected,
        messages: messagesUser.get(session.userID) || [],
      });
    });
    console.log(users);

    socket.emit('users', users);

    socket.broadcast.emit('user-connected', {
      userID: socket.userID,
      userName: socket.userName,
      connected: true,
      messages: [],
    });

    socket.on('private-message', ({ message, to }) => {
      console.log(messagesUser);
      const msg = {
        message: message,
        from: socket.userID,
        to,
      };
      console.log(msg);
      socket.to(to).to(socket.userID).emit('private message', {
        message,
        from: socket.userID,
        to,
      });
      messageStore.saveMessage(msg);
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
