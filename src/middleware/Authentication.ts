import db from "../models";
import jwt from "jsonwebtoken";
import { resModel } from "../utils";
import { NextFunction, Request, Response } from "express";

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
