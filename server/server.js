// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const {
  socketConnection,
  userAuth,
  onConnection,
  notifyUsers,
} = require('./config/sockets');
require('dotenv').config();
import './config/mongo';

// routes
const authRoute = require('./routes/auth');

const app = express();
const server = http.createServer(app);

// socket connection...
socketConnection(server);
userAuth();
onConnection();
notifyUsers();

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
