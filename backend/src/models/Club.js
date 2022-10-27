const { model, Schema } = require('mongoose');

const clubSchema = new Schema({
  name: String,
  sport: String,
  locality: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Clubs', clubSchema);
