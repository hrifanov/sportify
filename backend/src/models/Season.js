const { model, Schema } = require('mongoose');

const seasonSchema = new Schema({
    name: String,
    dateStart: Date,
    dateEnd: Date
});

module.exports = model('Seasons', seasonSchema);