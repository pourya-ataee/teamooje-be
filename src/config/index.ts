import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize: Sequelize = new Sequelize(
	process.env.NODE_PUBLIC_DB as string,
	process.env.NODE_PUBLIC_USER as string,
	process.env.NODE_PUBLIC_PASSWORD as string,
	{
		host: process.env.NODE_PUBLIC_HOST as string,
		dialect: process.env.NODE_PUBLIC_dialect as Dialect,
	}
);

export default sequelize;
