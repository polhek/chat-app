const mongoose = require('mongoose');
require('dotenv').config();

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
    console.log('Failed to connect to mongoDB!', error);
  }
};
mongoConnection();
