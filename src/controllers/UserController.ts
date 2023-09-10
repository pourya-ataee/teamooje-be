import { Request, Response } from 'express';
import db from '../models';
import { errObj, resModel } from '../utils/utils';
import { UserAttributes } from '../models/UserModel';
import { teamsTransform } from '../transforms';

export const getTeams = async (req: Request, res: Response) => {
	try {
		const user = (await db.user.findOne({
			where: { id: req.user?.id },
			include: {
				model: db.team,
				as: 'teams',
				include: [
					{
						model: db.user,
						as: 'admin',
					},
				],
			},
		})) as UserAttributes;

		return res.status(200).json(
			resModel({
				data: teamsTransform(user.teams),
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
