import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
import { IUser, UserSchema } from "./UserModel";

export interface ITeam extends Document {
	id: number;
	name: string;
	admin: ObjectId;
	users: ObjectId[];
	description?: string;
}

export const TeamSchema = new Schema(
	{
		description: { type: String },
		name: { type: String, required: true },
		admin: { type: Schema.Types.ObjectId, ref: "user" },
		users: [{ type: Schema.Types.ObjectId, ref: "user" }],
	},
	{ timestamps: true }
);

const TeamModel: Model<ITeam> = mongoose.model<ITeam>("team", TeamSchema);

export default TeamModel;
