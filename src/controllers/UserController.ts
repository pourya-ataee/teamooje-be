import { Request, Response } from "express";
import UserTeamsModel from "../models/UserTeamsModel";
import { errObj, resModel } from "../utils";
import db from "../models";

export const fetchTeams = async (req: Request, res: Response) => {
	try {
		const userTeams = await db.userTeams.findOne({ id: req.user?.id }).populate("teams").exec();
		return res.status(200).json(
			resModel({
				data: userTeams,
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
