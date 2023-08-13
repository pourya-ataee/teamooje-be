import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const timestamps = require('mongoose-timestamp')

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
});
UserSchema.plugin(timestamps);

UserSchema.pre('save', function (next) {
	bcrypt.hash(this.password, 12, (err, hash) => {
		this.password = hash;
		next();
	});
});

module.exports = mongoose.model('User', UserSchema);
