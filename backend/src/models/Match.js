const { model, Schema } = require('mongoose');

const team = new Schema({
  name: String,
  teamPlayers: [{ type: Schema.Types.ObjectId, ref: 'TeamPlayer' }],
});

const matchSchema = new Schema({
  club: { type: Schema.Types.ObjectId, ref: 'Club' },
  date: Date,
  place: String,
  teams: {
    home: team,
    guest: team,
  },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

module.exports = model('Matches', matchSchema);
