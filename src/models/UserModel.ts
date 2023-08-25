import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import Team from './TeamModel';
import bcrypt from 'bcrypt';

export interface UserAttributes extends Model {
	username: string;
	email: string;
	password: string;
}

const User = sequelize.define<UserAttributes>(
	'User',
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: /^[0-9a-f]{64}$/i,
			},
		},
	},
	{
		tableName: 'tpdb_users',
		timestamps: true,
		underscored: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);

User.beforeCreate(async (user) => {
	const hashedPassword = await bcrypt.hash(user.password, 10);
	user.password = hashedPassword;
});

User.beforeUpdate(async (user) => {
	if (user.changed('password')) {
		const hashedPassword = await bcrypt.hash(user.password, 10);
		user.password = hashedPassword;
	}
});

export default User;
