import mongoose, { Document } from 'mongoose';

interface TeamDocument extends Document {
	name: string;
	admin: mongoose.Schema.Types.ObjectId;
	users: mongoose.Schema.Types.ObjectId[];
}

const Schema = mongoose.Schema;
const TeamSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
);

export default mongoose.model('Team', TeamSchema);
