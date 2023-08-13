import mongoose from 'mongoose';
const timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const TeamSchema = new Schema({
	name: { type: String, required: true, unique: true },
	admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
TeamSchema.plugin(timestamps);

module.exports = mongoose.model('Team', TeamSchema);
