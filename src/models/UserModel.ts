import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { Team } from './TeamModel';
const sequelize = new Sequelize('sqlite::memory:');

interface UserAttributes extends Model {
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
		},
	},
	{
		timestamps: true,
		underscored: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	}
);

User.belongsToMany(Team, { through: 'UserTeams' });

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

export { User };
