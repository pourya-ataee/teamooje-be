import { NextFunction, Request, Response } from 'express';
import db from '../models';
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { resModel } from '../utils/utils';
import { UserAttributes } from '../models/UserModel';
import { ExtendedError } from 'socket.io/dist/namespace';

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

export interface ISocket extends Socket {
	decoded?: string | JwtPayload;
}

export const socketAuthMiddleware = (socket: ISocket, next: (err?: ExtendedError | undefined) => void) => {
	if (socket.handshake.query && socket.handshake.query.token) {
		jwt.verify(socket.handshake.query.token as string, process.env.NODE_PRIVATE_SECRET as string, async (err, decoded) => {
			if (err) return next(new Error('Authentication error'));
			const user = await db.user.findOne({ where: { id: (decoded as { userId: number }).userId } });
			if (!user) return next(new Error('Authentication error'));
			socket.decoded = decoded;
			next();
		});
	} else {
		next(new Error('Authentication error'));
	}
};
