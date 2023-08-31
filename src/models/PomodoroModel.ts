import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';

export interface PomodoroAttributes extends Model {
	id: number;
	end_date: Date;
	counting: boolean;
	duration: number;
	remaining: number;
	state: 'work' | 'rest';
    user_id: number;
}

const Pomodoro = sequelize.define<PomodoroAttributes>(
	'Pomodoro',
	{
		end_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		counting: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'وارد کردن مدت زمان الزامیست',
				},
				notNull: {
					msg: 'وارد کردن مدت زمان الزامیست',
				},
			},
		},
		remaining: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		state: {
			type: DataTypes.STRING,
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
