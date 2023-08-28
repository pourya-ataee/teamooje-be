import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import Team, { TeamAttributes } from './TeamModel';
import User, { UserAttributes } from './UserModel';

export interface UserTeamsAttributes extends Model {
	user_id: number;
	team_id: number;
	team: TeamAttributes;
	user: UserAttributes;
}

const UserTeams = sequelize.define<UserTeamsAttributes>(
	'UserTeams',
	{
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: 'id',
			},
			allowNull: false,
		},
		team_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Team,
				key: 'id',
			},
			allowNull: false,
		},
	},
	{
		tableName: 'tpdb_user_teams',
		timestamps: true,
		underscored: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);

export default UserTeams;
