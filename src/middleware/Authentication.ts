import db from "../models";
import { resModel } from "../utils";
import { Request } from "../types";
import { Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(401).json(
				resModel({
					success: false,
					error: "اجازه دسترسی به این بخش را ندارید",
				})
			);
		}

		const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as { userId: number };
		const user = await db.user.findById(decodedToken.userId);
		if (!user) {
			return res.status(401).json(
				resModel({
					success: false,
					error: "اجازه دسترسی به این بخش را ندارید",
				})
			);
		}

		req.user = user;
		next();
	} catch {
		res.status(401).json(
			resModel({
				success: false,
				error: "اجازه دسترسی به این بخش را ندارید",
			})
		);
	}
};

export interface ISocket extends Socket {
	decoded?: string | JwtPayload;
}

export const socketAuthMiddleware = (socket: ISocket, next: (err?: any) => void) => {
	if (socket.handshake.query && socket.handshake.query.token) {
		jwt.verify(socket.handshake.query.token as string, process.env.SECRET_KEY as string, async (err, decoded) => {
			if (err) return next(new Error("Authentication error"));
			const user = await db.user.findById(decoded);
			if (!user) return next(new Error("Authentication error"));
			socket.decoded = decoded;
			next();
		});
	} else {
		next(new Error("Authentication error"));
	}
};
