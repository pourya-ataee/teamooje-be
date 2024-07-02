import TeamModel from "./TeamModel";
import UserModel from "./UserModel";
import UserTeamModel from "./UserTeamModel";

const db = {
	user: UserModel,
	team: TeamModel,
	userTeam: UserTeamModel,
};

export default db;
