import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';

export interface TeamAttributes extends Model {
	id: number;
	name: string;
	admin: number;
	users?: string;
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
		admin: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		users: {
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
