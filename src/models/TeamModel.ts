import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import User, { UserAttributes } from './UserModel';

export interface TeamAttributes extends Model {
	id: number;
	name: string;
	admin_id: number;
	description?: string;
	admin: UserAttributes;
	users: UserAttributes[];
	removeUser: (e: UserAttributes) => void;
	addUser: (e: UserAttributes, a?: { through: { admin_id: number } }) => void;
}

const Team = sequelize.define<TeamAttributes>(
	'Team',
	{
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'وارد کردن نام تیم الزامیست',
				},
				notNull: {
					msg: 'وارد کردن نام تیم الزامیست',
				},
			},
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: 'tpdb_teams',
		timestamps: true,
		underscored: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);

export default Team;
