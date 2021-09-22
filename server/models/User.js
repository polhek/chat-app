const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true, minlength: 4 },
  chats: [{ type: Schema.Types.ObjectId, ref: 'ChatRoom' }],
});

module.exports = mongoose.model('User', UserSchema);
