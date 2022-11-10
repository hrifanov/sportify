const { model, Schema } = require('mongoose');

const clubSchema = new Schema({
  name: String,
  sport: String,
  locality: String,
  players: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      isAdmin: Boolean,
    },
  ],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Clubs', clubSchema);
