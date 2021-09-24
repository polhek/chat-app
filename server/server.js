// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

require('dotenv').config();
import './config/mongo';

// routes
const authRoute = require('./routes/auth');

const app = express();
const server = http.createServer(app);

// socket connection...
const io = require('socket.io')(server, {
  transports: ['websocket', 'polling', 'flashsocket'],
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket) => {
  console.log('User is connected!');

  socket.on('disconnect', () => {
    console.log(`User socket ${socket.id} has disconnected!`);
  });
});

export { io };

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Chat app - server </h1>');
});
app.use('/api/auth', authRoute);

// server listening on port 5000...
server.listen(5000, () => {
  console.log('Server running on port 5000!');
});
