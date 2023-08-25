import { Request, Response } from 'express';
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import db from '../models';
import jwt from 'jsonwebtoken';

const loginSchema = yup.object().shape({
	email: yup.string().email('ایمیل وارد شده صحیح نمی‌باشد').required('وارد کردن ایمیل الزامیست'),
	password: yup.string().required('وارد کردن رمزعبور الزامیست'),
});

export const login = async (req: Request, res: Response) => {};

const signupSchema = yup.object().shape({
	name: yup.string().required('وارد کردن نام کاربری الزامیست'),
	email: yup.string().email('ایمیل وارد شده صحیح نمی‌باشد').required('وارد کردن ایمیل الزامیست'),
	password: yup.string().required('وارد کردن رمزعبور الزامیست'),
});

export const signup = async (req: Request, res: Response) => {};
