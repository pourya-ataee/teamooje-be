import { Request, Response } from 'express';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import User, { UserDocument } from '../models/UserModel';
import { loginTransform } from '../transforms/UserTransform';

const loginSchema = yup.object().shape({
	email: yup.string().email('ایمیل وارد شده صحیح نمی‌باشد').required('وارد کردن ایمیل الزامیست'),
	password: yup.string().required('وارد کردن رمزعبور الزامیست'),
});
export const login = (req: Request, res: Response) => {
	loginSchema.isValid(req.body).then(async (valid) => {
		try {
			const user = await User.findOne({ email: req.body.email }).exec();
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
					data: loginTransform(user),
					message: 'ورود شما موفق بود',
					success: true,
				});
			});
		} catch (err) {
			console.log(err);
			res.status(401).json({
				data: null,
				message: 'اطلاعات وارد شده صحیح نیست',
				success: false,
			});
		}
	});
};

const signupSchema = yup.object().shape({
	name: yup.string().required('وارد کردن نام کاربری الزامیست'),
	email: yup.string().email('ایمیل وارد شده صحیح نمی‌باشد').required('وارد کردن ایمیل الزامیست'),
	password: yup.string().required('وارد کردن رمزعبور الزامیست'),
});
export const signup = (req: Request, res: Response) => {
	signupSchema
		.isValid(req.body)
		.then((valid) => {
			if (!valid) {
				return res.status(400).json({
					data: null,
					message: 'اطلاعات وارد شده صحیح نیست',
					success: false,
				});
			}
			new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
			})
				.save()
				.then(() => {
					return res.status(200).json({
						data: null,
						message: 'عضویت شما با موفقیت انجام شد',
						success: true,
					});
				})
				.catch((err) => {
					if (err) {
            console.log(err)
						if (err.code == 11000) {
							return res.status(409).json({
								message: 'ایمیل نمی تواند تکراری باشد',
								success: false,
							});
						} else {
							throw err;
						}
					}
				});
		})
		.catch((reason) => {
			res.status(400).json({
				data: null,
				message: 'اطلاعات وارد شده صحیح نیست',
				success: false,
			});
		});
};
