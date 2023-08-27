import sequelize from '../config';
import Team from './TeamModel';
import User from './UserModel';

const db = {
	sequelize: sequelize,
	user: User,
	team: Team,
};

export default db;
