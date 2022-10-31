const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  userName: String,
  password: String,
  name: String,
  email: String,
  tokenVersion: Number,
  verified: Boolean,
});

module.exports = model('Users', userSchema);
