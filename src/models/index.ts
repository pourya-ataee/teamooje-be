import sequelize from '../config';
import Pomodoro from './PomodoroModel';
import Team from './TeamModel';
import User from './UserModel';
import UserTeams from './UserTeamsModel';

// Team associations
User.belongsToMany(Team, { through: 'tpdb_user_teams', as: 'teams' });
Team.belongsToMany(User, { through: 'tpdb_user_teams', as: 'users' });
Team.belongsTo(User, { foreignKey: 'admin_id', as: 'admin' });

// Pomodoro associations
User.hasOne(Pomodoro, { foreignKey: 'user_id', as: 'pomodoro' });
Pomodoro.belongsTo(User, { foreignKey: 'user_id' });

const db = {
	sequelize: sequelize,
	user: User,
	team: Team,
	userTeams: UserTeams,
	pomodoro: Pomodoro,
};

export default db;
