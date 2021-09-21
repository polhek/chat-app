// dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
require('dotenv').config();

const app = express();
// routes
const authRoute = require('./routes/auth');

// Mongoose connection...
const MONGO_URL = process.env.MONGO_URL;
const mongoDB = process.env.MONGODB_URI || MONGO_URL;

const mongoConnection = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB successfully connected!');
  } catch (error) {
    console.log('Failed to connect to mongoDB!');
  }
};
mongoConnection();

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>Chat app - server </h1>');
});

// server listening on port 5000...
server.listen(5000, () => {
  console.log('Server running on port 3000!');
});

app.use('/api/auth', authRoute);
