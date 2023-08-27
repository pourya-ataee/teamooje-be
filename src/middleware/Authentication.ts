import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { resModel } from '../utils/utils';
import db from '../models';
import { UserAttributes } from '../models/UserModel';

dotenv.config();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json(
				resModel({
					success: false,
					error: 'اجازه دسترسی به این بخش را ندارید',
				})
			);
		}
		const decodedToken = jwt.verify(token, process.env.NODE_PRIVATE_SECRET as string) as { userId: number };
		const user = await db.user.findOne({ where: { id: decodedToken.userId } });
		if (!user) {
			return res.status(401).json(
				resModel({
					success: false,
					error: 'اجازه دسترسی به این بخش را ندارید',
				})
			);
		}
		req.user = user as UserAttributes;
		next();
	} catch {
		res.status(401).json(
			resModel({
				success: false,
				error: 'اجازه دسترسی به این بخش را ندارید',
			})
		);
	}
};
