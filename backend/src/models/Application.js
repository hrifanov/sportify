const { model, Schema } = require('mongoose');

const applicationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    club: { type: Schema.Types.ObjectId, ref: 'Club' },
    state: { type: String, enum: ["pending", "accepted", "declined"] },
    token: String,
    dateApplied: Date
});

module.exports = model('Applications', applicationSchema);