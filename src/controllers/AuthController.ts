import { Request, Response } from 'express';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import User from '../models/UserModel';
import { authTransform } from '../transforms/UserTransform';

const loginSchema = yup.object().shape({
	email: yup.string().email('ایمیل وارد شده صحیح نمی‌باشد').required('وارد کردن ایمیل الزامیست'),
	password: yup.string().required('وارد کردن رمزعبور الزامیست'),
});
export const login = async (req: Request, res: Response) => {
	try {
		await loginSchema.validate(req.body);
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(422).json({
				data: null,
				message: 'کاربری با این نام، یافت نشد',
				success: false,
			});
		}
		bcrypt.compare(req.body.password, user.password, (err, status) => {
			if (!status) {
				return res.status(422).json({
					success: false,
					data: null,
					message: 'رمزعبور وارد شده صحیح نمی باشد',
				});
			}
			return res.json({
				data: authTransform(user),
				message: 'ورود شما موفق بود',
				success: true,
			});
		});
	} catch (err: any) {
		return res.status(400).json({
			data: null,
			type: err.type,
			message: err.message,
			success: false,
		});
	}
};

const signupSchema = yup.object().shape({
	name: yup.string().required('وارد کردن نام کاربری الزامیست'),
	email: yup.string().email('ایمیل وارد شده صحیح نمی‌باشد').required('وارد کردن ایمیل الزامیست'),
	password: yup.string().required('وارد کردن رمزعبور الزامیست'),
});
export const signup = async (req: Request, res: Response) => {
	try {
		await signupSchema.validate(req.body);
		const user = await User.findOne({ email: req.body.email });
		if (!!user) {
			return res.status(409).json({
				data: null,
				type: 'email',
				message: 'ایمیل ثبت شده تکراری است',
				success: false,
			});
		}
		const newUser = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		const newUserDetail = await newUser.save();
		return res.status(200).json({
			data: authTransform(newUserDetail),
			message: 'حساب کاربری با موفقیت ایجاد شد',
			success: true,
		});
	} catch (err: any) {
		return res.status(400).json({
			data: null,
			type: err.type,
			message: err.message,
			success: false,
		});
	}
};
