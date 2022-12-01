const { model, Schema } = require('mongoose');

const seasonSchema = new Schema({
    name: String,
    club: { type: Schema.Types.ObjectId, ref: 'Club' },
});

module.exports = model('Seasons', seasonSchema);
