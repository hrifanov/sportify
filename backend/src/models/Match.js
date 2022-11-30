const { model, Schema } = require('mongoose');
const events = require('./Event');

const team = new Schema({
  name: String,
  teamPlayers: [{ type: Schema.Types.ObjectId, ref: 'TeamPlayer' }],
});

const matchSchema = new Schema({
  club: { type: Schema.Types.ObjectId, ref: 'Club' },
  date: Date,
  place: String,
  timer: Number,
  teams: {
    home: team,
    guest: team,
  },
  score: {
    home: Number,
    guest: Number
  },
  shots: {
    home: Number,
    guest: Number
  },
  events: [events.schema],
  season: { type: Schema.Types.ObjectId, ref:"Season" }
});

module.exports = model('Matches', matchSchema);
