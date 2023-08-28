import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';

export interface PomodoroAttributes extends Model {
	start_time: Date;
	end_time: Date;
	duration: number;
}

const Pomodoro = sequelize.define<PomodoroAttributes>(
	'Pomodoro',
	{
		start_time: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		end_time: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		tableName: 'tpdb_pomodoro',
		timestamps: true,
		underscored: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);

export default Pomodoro;
