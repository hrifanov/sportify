const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
  type: String,
  time: String,
  teamPlayer: { type: Schema.Types.ObjectId, ref: 'TeamPlayer' },
  value: Number,
});

module.exports = model('Events', eventSchema);
