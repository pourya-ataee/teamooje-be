import sequelize from '../config';
import Pomodoro from './PomodoroModel';
import Team from './TeamModel';
import User from './UserModel';

User.belongsToMany(Team, { through: 'tpdb_user_teams' });
Team.belongsToMany(User, { through: 'tpdb_user_teams' });
Team.belongsTo(User, { as: 'admin', foreignKey: 'admin_id' });

User.hasMany(Pomodoro);
Pomodoro.belongsTo(User);

const db = {
	sequelize: sequelize,
	user: User,
	team: Team,
	pomodoro: Pomodoro,
};

export default db;
