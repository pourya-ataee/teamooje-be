import { DataTypes, Model } from 'sequelize';
import sequelize from '../config';
import bcrypt from 'bcrypt';

export interface UserAttributes extends Model {
	id: number;
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
			validate: {
				notEmpty: {
					msg: 'وارد کردن نام و نام خانوادگی الزامیست',
				},
				notNull: {
					msg: 'وارد کردن نام و نام خانوادگی الزامیست',
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: {
					msg: 'وارد کردن ایمیل الزامیست',
				},
				notNull: {
					msg: 'وارد کردن ایمیل الزامیست',
				},
				isEmail: {
					msg: 'ایمیل وارد شده صحیح نمی‌باشد',
				},
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					msg: 'وارد کردن رمزعبور الزامیست',
				},
				notNull: {
					msg: 'وارد کردن رمزعبور الزامیست',
				},
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
