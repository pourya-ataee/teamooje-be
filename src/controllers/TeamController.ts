import { Request, Response } from 'express';
import { errObj, resModel } from '../utils/utils';
import db, { UserTeams } from '../models';

export const createTeam = async (req: Request, res: Response) => {
	try {
		const newTeam = await db.team.create(
			{
				name: req.body.name,
				admin: req.body.user_id,
			},
			{
				include: [
					{
						association: UserTeams,
						as: 'admin',
					},
				],
			}
		);
		return res.status(200).json(
			resModel({
				data: newTeam.name,
				success: true,
				successMessage: 'تیم شما با موفقیت ایجاد شد',
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
