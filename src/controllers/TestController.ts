import { Request, Response } from 'express';
import db from '../models';

const test = async (req: Request, res: Response) => {
	try {
		await db.sequelize.authenticate();
		console.log('Connection has been established successfully.');
		return res.status(200).json('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
		return res.status(502).json(`Unable to connect to the database: ${error}`);
	}
};

export default test;
