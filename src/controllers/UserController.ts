import { Response } from "express";
import { errObj, resModel } from "../utils";
import db from "../models";
import { Request } from "../types";
import { userTeamsTransform } from "../transforms";

export const fetchTeams = async (req: Request, res: Response) => {
	try {
		const userTeams = await db.userTeam
			.find({ user: req.user?.id })
			.populate({
				path: "team",
				populate: { path: "admin" },
			})
			.exec();

		return res.status(200).json(
			resModel({
				data: userTeamsTransform(userTeams),
				success: true,
			})
		);
	} catch (err: any) {
		return res.status(500).json(
			resModel({
				success: false,
				error: errObj(err),
			})
		);
	}
};
