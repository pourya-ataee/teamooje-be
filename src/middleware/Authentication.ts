import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { resModel } from '../utils/utils';

dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
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
		const decodedToken = jwt.verify(token, process.env.NODE_PRIVATE_SECRET as string) as { user_id: number };
		const userId = decodedToken.user_id;
		if (req.body.user_id && req.body.user_id !== userId) {
			return res.status(401).json(
				resModel({
					success: false,
					error: 'اجازه دسترسی به این بخش را ندارید',
				})
			);
		}
		req.body.user_id = userId;
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
