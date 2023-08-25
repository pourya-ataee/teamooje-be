import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import User from './UserModel';

interface TeamAttributes extends Model {
	username: string;
	email: string;
	password: string;
}

const Team = sequelize.define<TeamAttributes>(
	'Team',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: 'tpdb_teams',
	}
);

export default Team;
