import { Request, Response } from 'express';
import db from '../models';
import { errObj, resModel } from '../utils/utils';
import { TeamAttributes } from '../models/TeamModel';
import { UserAttributes } from '../models/UserModel';

export const createTeam = async (req: Request, res: Response) => {
	try {
		const newTeam = await db.team.create({
			name: req.body.name,
			admin: req.user?.id,
			users: req.user?.id.toString(),
		});
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
		const user = (await db.user.findOne({ where: { email: req.body.email } })) as UserAttributes;
		if (!user) {
			return res.status(404).json(
				resModel({
					success: false,
					error: { email: 'کاربری با این ایمیل یافت نشد' },
				})
			);
		}
		if (team.users?.split(',')?.includes(user.id.toString())) {
			return res.status(400).json(
				resModel({
					success: false,
					error: { email: 'کاربر در حال حاضر عضوی از تیم است' },
				})
			);
		}
		team.users = !!team.users ? team.users + `,${user.id}` : `${user.id}`;
		await team.save();
		return res.status(200).json(
			resModel({
				success: true,
				successMessage: 'کاربر با موفقیت اضافه شد',
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
		const user = (await db.user.findOne({ where: { email: req.params.user } })) as UserAttributes;
		if (!user) {
			return res.status(404).json(
				resModel({
					success: false,
					error: { email: 'کاربری با این ایمیل یافت نشد' },
				})
			);
		}
		if (!team.users?.split(',')?.includes(user.id.toString())) {
			return res.status(200).json(
				resModel({
					success: true,
					successMessage: 'کاربر از تیم حذف شد',
				})
			);
		}
		team.users = team.users
			?.split(',')
			.filter((e) => e !== user.id.toString())
			.join(',');
		await team.save();
		return res.status(200).json(
			resModel({
				success: true,
				successMessage: 'کاربر از تیم حذف شد',
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
