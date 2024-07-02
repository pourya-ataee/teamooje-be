import { IUser } from "./UserModel";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITeam extends Document {
	name: string;
	admin: IUser & Document;
	description?: string;
}

export const TeamSchema = new Schema(
	{
		description: { type: String },
		name: { type: String, required: true },
		admin: { type: Schema.Types.ObjectId, ref: "user" },
	},
	{ timestamps: true }
);

const TeamModel: Model<ITeam> = mongoose.model<ITeam>("team", TeamSchema);

export default TeamModel;
