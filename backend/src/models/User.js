const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    userName: String,
    password: String,
    name: String,
    email: String,
    profileImageUrl: String,
});

module.exports = model('Users', userSchema);