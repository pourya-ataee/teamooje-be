import db from "../models";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { errObj, resModel } from "../utils";
import { authTransform } from "../transforms";

export const login = async (req: Request, res: Response) => {
	try {
		if (!req.body.email || !req.body.password) {
			return res.status(500).json(
				resModel({
					success: false,
					error: {
						...(!req.body.email && { email: "وارد کردن ایمیل الزامیست" }),
						...(!req.body.password && { password: "وارد کردن رمزعبور الزامیست" }),
					},
				})
			);
		}

		const user = await db.user.findOne({ email: req.body.email });
		if (!user) {
			return res.status(422).json(
				resModel({
					success: false,
					error: { email: "کاربری با این ایمیل، یافت نشد" },
				})
			);
		}

		bcrypt.compare(req.body.password, user.password, (err, status) => {
			console.log(err);
			console.log(status);
			if (!status) {
				return res.status(422).json(
					resModel({
						success: false,
						error: { password: "رمزعبور وارد شده صحیح نمی باشد" },
					})
				);
			}
			return res.status(200).json(
				resModel({
					data: authTransform(user),
					success: true,
					successMessage: "با موفقیت وارد شدید",
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
		const user = new db.user({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
		});
		console.log(user);
		const newUser = await user.save();
		console.log(newUser);
		return res.status(200).json(
			resModel({
				success: true,
				data: authTransform(user),
				successMessage: "حساب کاربری با موفقیت ایجاد شد",
			})
		);
	} catch (err: any) {
		if (err?.code === 11000) {
			return res.status(409).json(
				resModel({
					success: false,
					error: {
						...(!!err?.keyPattern?.email && { email: "ایمیل وارد شده تکراری است" }),
						...(!!err?.keyPattern?.username && { username: "نام کاربری وارد شده تکراری است" }),
					},
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
