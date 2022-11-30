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
  contactPerson: { type: Schema.Types.ObjectId, ref: 'User' },
  imageURL: String
});

module.exports = model('Clubs', clubSchema);
