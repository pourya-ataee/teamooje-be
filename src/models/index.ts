import sequelize from '../config';
import Team from './TeamModel';
import User from './UserModel';

export const UserTeams = User.belongsToMany(Team, { through: 'tpdb_user_teams' });
Team.belongsToMany(User, { through: 'tpdb_user_teams' });
Team.belongsTo(User, { as: 'admin', foreignKey: 'adminId' });

const db = {
	sequelize: sequelize,
	user: User,
	team: Team,
};

export default db;
