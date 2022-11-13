const { model, Schema } = require('mongoose');

const TeamPlayer = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  role: String,
});

const team = new Schema({
  name: String,
  TeamPlayers: [TeamPlayer],
});

const event = new Schema({
  type: String,
  TeamPlayer: { type: Schema.Types.ObjectId, ref: 'User' },
  time: String,
  value: Number,
});

const matchSchema = new Schema({
  club: { type: Schema.Types.ObjectId, ref: 'Club' },
  date: Date,
  teams: {
    home: team,
    guest: team,
  },
  events: [event],
});

module.exports = model('Matches', matchSchema);
