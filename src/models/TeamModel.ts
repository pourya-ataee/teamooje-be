import { Sequelize, DataTypes, Model } from 'sequelize';
import { User } from './UserModel';
const sequelize = new Sequelize('sqlite::memory:');

interface TeamAttributes extends Model {
	username: string;
	email: string;
	password: string;
}

const Team = sequelize.define<TeamAttributes>('Team', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	users: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

Team.belongsToMany(User, { through: 'UserTeams' });
Team.belongsTo(User, { as: 'admin', foreignKey: 'adminId' });

export { Team };
