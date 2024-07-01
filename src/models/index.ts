import TeamModel from "./TeamModel";
import UserModel from "./UserModel";
import UserTeamsModel from "./UserTeamsModel";

const db = {
	user: UserModel,
	team: TeamModel,
	userTeams: UserTeamsModel,
};

export default db;
