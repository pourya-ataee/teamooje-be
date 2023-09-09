import { Request, Response } from 'express';
import db from '../models';
import { errObj, resModel } from '../utils/utils';
import { UserAttributes } from '../models/UserModel';

export const changeStatus = async (req: Request, res: Response) => {
	try {
		const pomodoro = await db.pomodoro.findOne({
			where: { user_id: req.user?.id },
		});
		if (!pomodoro) {
			await db.pomodoro.create({
				end_date: req.body.end_date,
				counting: req.body.counting,
				duration: req.body.duration,
				remaining: req.body.remaining,
				state: req.body.state,
				user_id: req.user?.id,
			});
		} else {
			pomodoro.end_date = req.body.end_date;
			pomodoro.counting = req.body.counting;
			pomodoro.duration = req.body.duration;
			pomodoro.remaining = req.body.remaining;
			pomodoro.state = req.body.state;
			pomodoro.save();
		}
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

export const getStatus = async (req: Request, res: Response) => {
	try {
		const user = (await db.user.findOne({ where: { id: req.user?.id } })) as UserAttributes;
		const pomodoro = await user.getPomodoro();
		if (!pomodoro) {
			return res.status(404).json(
				resModel({
					success: false,
					error: 'اطلاعاتی یافت نشد',
				})
			);
		}
		return res.status(200).json(
			resModel({
				success: true,
				data: pomodoro,
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
