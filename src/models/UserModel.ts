import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
	name: string;
	email: string;
	password: string;
	teams: mongoose.Schema.Types.ObjectId;
}

const Schema = mongoose.Schema;
const UserSchema = new Schema<UserDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		teams: [{ type: Schema.Types.ObjectId, ref: 'Team' }],
	},
	{ timestamps: true }
);

UserSchema.pre<UserDocument>('save', function (next) {
	bcrypt.hash(this.password, 12, (err, hash) => {
		this.password = hash;
		next();
	});
});

export default mongoose.model<UserDocument>('User', UserSchema);
