const { model, Schema } = require('mongoose');

const player = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'User' },
  role: String,
});

const team = new Schema({
  name: String,
  players: [player],
});

const event = new Schema({
  type: String,
  time: Date,
});

const matchSchema = new Schema({
  club: { type: Schema.Types.ObjectId, ref: 'Club' },
  teams: {
    home: team,
    guest: team,
  },
  date: Date,
  events: [event],
});

module.exports = model('Matches', matchSchema);
