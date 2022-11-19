const { model, Schema } = require('mongoose');

const teamPlayerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  role: String,
});

module.exports = model('TeamPlayers', teamPlayerSchema);
