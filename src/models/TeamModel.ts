import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';

interface TeamAttributes extends Model {
	id: number;
	name: string;
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
	},
	{
		tableName: 'tpdb_teams',
	}
);

export default Team;
