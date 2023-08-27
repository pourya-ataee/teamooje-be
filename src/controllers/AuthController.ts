import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from '../models';
import { errObj, resModel } from '../utils/utils';
import { authTransform } from '../transforms/UserTransform';

export const login = async (req: Request, res: Response) => {
	try {
		if (!req.body.email || !req.body.password) {
			return res.status(500).json(
				resModel({
					success: false,
					error: {
						...(!req.body.email && { email: 'وارد کردن ایمیل الزامیست' }),
						...(!req.body.password && { password: 'وارد کردن رمزعبور الزامیست' }),
					},
				})
			);
		}
		const user = await db.user.findOne({ where: { email: req.body.email } });
		if (!user) {
			return res.status(422).json(
				resModel({
					success: false,
					error: { email: 'کاربری با این نام، یافت نشد' },
				})
			);
		}
		bcrypt.compare(req.body.password, user.password, (err, status) => {
			if (!status) {
				return res.status(422).json(
					resModel({
						success: false,
						error: { password: 'رمزعبور وارد شده صحیح نمی باشد' },
					})
				);
			}
			return res.status(200).json(
				resModel({
					data: authTransform(user),
					success: true,
					successMessage: 'با موفقیت وارد شدید',
				})
			);
		});
	} catch (err: any) {
		return res.status(500).json(
			resModel({
				success: false,
				error: errObj(err),
			})
		);
	}
};

export const signup = async (req: Request, res: Response) => {
	try {
		const newUser = await db.user.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		return res.status(200).json(
			resModel({
				data: authTransform(newUser),
				success: true,
				successMessage: 'حساب کاربری با موفقیت ایجاد شد',
			})
		);
	} catch (err: any) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(409).json(
				resModel({
					success: false,
					error: { email: 'ایمیل وارد شده تکراری است' },
				})
			);
		}
		return res.status(500).json(
			resModel({
				success: false,
				error: errObj(err),
			})
		);
	}
};
