import { IUser } from "./UserModel";
import { ITeam } from "./TeamModel";
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserTeam extends Document {
	team: ITeam & Document;
	user: IUser & Document;
}

export const UserTeamSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "user" },
		team: { type: Schema.Types.ObjectId, ref: "team" },
	},
	{ timestamps: true }
);

const UserTeamModel: Model<IUserTeam> = mongoose.model<IUserTeam>("userteam", UserTeamSchema);

export default UserTeamModel;
