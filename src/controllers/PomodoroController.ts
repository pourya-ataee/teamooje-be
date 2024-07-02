import db from "../models";
import { Response } from "express";
import { Request } from "../types";
import { errObj, resModel } from "../utils";
import { pomodoroTransform } from "../transforms";

export const changeStatus = async (req: Request, res: Response) => {
	try {
		await db.user.findByIdAndUpdate(req.user?.id, {
			$set: {
				"pomodoro.duration": req.body.duration,
				"pomodoro.counting": req.body.counting,
				"pomodoro.remaining": req.body.remaining,
				"pomodoro.state": req.body.state,
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

export const fetchStatus = async (req: Request, res: Response) => {
	try {
		const user = await db.user.findById(req.user?.id);
		if (!user?.pomodoro) {
			return res.status(404).json(
				resModel({
					success: false,
					error: "اطلاعاتی یافت نشد",
				})
			);
		}
		return res.status(200).json(
			resModel({
				success: true,
				data: pomodoroTransform(user.pomodoro),
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
