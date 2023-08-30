import { Request, Response } from 'express';
import db from '../models';
import { errObj, resModel } from '../utils/utils';
import { TeamAttributes } from '../models/TeamModel';
import { UserAttributes } from '../models/UserModel';
import { userTransform, usersTransform } from '../transforms/UserTransform';

export const createTeam = async (req: Request, res: Response) => {
	try {
		const newTeam = await db.team.create({
			name: req.body.name,
			description: req.body.description,
			admin_id: req.user?.id,
		});
		newTeam.addUser(req.user as UserAttributes);
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

export const addUser = async (req: Request, res: Response) => {
	try {
		const team = (await db.team.findOne({ where: { id: req.params.id } })) as TeamAttributes;
		if (!team) {
			return res.status(404).json(
				resModel({
					success: false,
					error: 'تیم مورد نظر یافت نشد',
				})
			);
		}
		if (team.admin_id === req.user?.id) {
			const user = (await db.user.findOne({ where: { email: req.body.email } })) as UserAttributes;
			if (!user) {
				return res.status(404).json(
					resModel({
						success: false,
						error: { email: 'کاربری با این ایمیل یافت نشد' },
					})
				);
			}
			team.addUser(user);
			return res.status(200).json(
				resModel({
					success: true,
					successMessage: 'کاربر با موفقیت اضافه شد',
				})
			);
		} else {
			return res.status(403).json(
				resModel({
					success: false,
					error: 'شما به این تیم دسترسی ندارید',
				})
			);
		}
	} catch (err) {
		return res.status(500).json(
			resModel({
				success: false,
				error: errObj(err),
			})
		);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const team = (await db.team.findOne({ where: { id: req.params.id } })) as TeamAttributes;
		if (!team) {
			return res.status(404).json(
				resModel({
					success: false,
					error: 'تیم مورد نظر یافت نشد',
				})
			);
		}
		if (team.admin_id === req.user?.id) {
			const user = (await db.user.findOne({ where: { email: req.params.user } })) as UserAttributes;
			if (!user) {
				return res.status(404).json(
					resModel({
						success: false,
						error: { email: 'کاربری با این ایمیل یافت نشد' },
					})
				);
			}
			team.removeUser(user);
			return res.status(200).json(
				resModel({
					success: true,
					successMessage: 'کاربر از تیم حذف شد',
				})
			);
		} else {
			return res.status(403).json(
				resModel({
					success: false,
					error: 'شما به این تیم دسترسی ندارید',
				})
			);
		}
	} catch (err) {
		return res.status(500).json(
			resModel({
				success: false,
				error: errObj(err),
			})
		);
	}
};

export const getUsers = async (req: Request, res: Response) => {
	try {
		const team = (await db.team.findOne({
			where: { id: req.params.id },
			include: [
				{
					model: db.user,
					as: 'admin',
				},
				{
					model: db.user,
					as: 'users',
					include: {
						model: db.pomodoro,
						as: 'pomodoro',
					},
				},
			],
		})) as TeamAttributes;

		if (!team) {
			return res.status(404).json(
				resModel({
					success: false,
					error: 'تیم مورد نظر یافت نشد',
				})
			);
		}

		return res.status(200).json(
			resModel({
				success: true,
				data: {
					admin: userTransform(team.admin),
					users: usersTransform(team.users),
				},
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
