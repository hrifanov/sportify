const { model, Schema } = require('mongoose');

const teamPlayer = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  role: String,
});

const team = new Schema({
  name: String,
  teamPlayers: [teamPlayer],
});

const event = new Schema({
  type: String,
  teamPlayer: { type: Schema.Types.ObjectId, ref: 'User' },
  value: String,
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
