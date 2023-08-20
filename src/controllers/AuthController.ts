import {Request, Response} from "express";
import * as yup from 'yup';

const loginSchema = yup.object().shape({
	email: yup.string().email('ایمیل وارد شده صحیح نمی‌باشد').required(''),
	password: yup.string().required()
})
export const login = (req: Request, res: Response) => {
	loginSchema.isValid(req.body)
		.then((valid) => {
			res.status(200).json()
		})
		.catch((reason) => {
			res.status(401).json()
		})
}

const signupSchema = yup.object().shape({
	name: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().required()
})
export const signup = (req: Request, res: Response) => {
	signupSchema.isValid(req.body)
	.then((valid) => {
		res.status(200).json()
	}).catch((reason) => {
		res.status(400)
	})
}