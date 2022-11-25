const { model, Schema } = require('mongoose');

const eventSchema = new Schema({
  type: String,
  time: String,
  data: Object
});

module.exports = model('Events', eventSchema);
