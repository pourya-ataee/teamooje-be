import mongoose from 'mongoose';

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
