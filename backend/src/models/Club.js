const { model, Schema } = require('mongoose');

const clubSchema = new Schema({
  name: String,
  sport: String,
  locality: String,
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Clubs', clubSchema);
