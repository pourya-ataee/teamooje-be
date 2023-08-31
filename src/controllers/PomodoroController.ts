import { Request, Response } from 'express';
import db from '../models';
import { errObj, resModel } from '../utils/utils';

export const changeStatus = async (req: Request, res: Response) => {
	try {
		await db.pomodoro.findOrCreate({
			where: { user_id: req.user?.id },
			defaults: {
				end_date: req.body.end_date,
				counting: req.body.counting,
				duration: req.body.duration,
				remaining: req.body.remaining,
				state: req.body.state,
				user_id: req.user?.id,
			},
		});
		return res.status(200).json(
			resModel({
				success: true,
			})
		);
	} catch (err) {
		return res.status(500).json(
			resModel({
				success: false,
				error: errObj(err),
			})
		);
	}
};
