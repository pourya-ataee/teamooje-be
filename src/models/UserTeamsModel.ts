import mongoose, { Model, ObjectId, Schema } from "mongoose";
import { ITeam } from "./TeamModel";

interface UserTeams {
	user: ObjectId;
	teams: ITeam[];
}

const UserTeamsSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "user" },
		teams: [{ type: Schema.Types.ObjectId, ref: "team" }],
	},
	{ timestamps: true }
);

const UserTeamsModel: Model<UserTeams> = mongoose.model<UserTeams>("userTeams", UserTeamsSchema);

export default UserTeamsModel;
