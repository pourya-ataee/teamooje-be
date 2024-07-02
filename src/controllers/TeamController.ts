import db from "../models";
import { Request } from "../types";
import { Response } from "express";
import { errObj, resModel } from "../utils";
import { teamUsersTransform, userTransform } from "./../transforms/index";

export const createTeam = async (req: Request, res: Response) => {
	try {
		const newTeam = await db.team.create({
			name: req.body.name,
			description: req.body.description,
			admin: req.user?.id,
		});

		await db.userTeam.create({ user: req.user?.id, team: newTeam.id });

		return res.status(200).json(
			resModel({
				data: newTeam.name,
				success: true,
				successMessage: "تیم شما با موفقیت ایجاد شد",
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
		const team = await db.team.findById(req.params.id);
		if (!team) {
			return res.status(404).json(
				resModel({
					success: false,
					error: "تیم مورد نظر یافت نشد",
				})
			);
		}

		if (team.admin.valueOf() === req.user?.id) {
			const user = await db.user.findOne({ email: req.body.email });
			if (!user) {
				return res.status(404).json(
					resModel({
						success: false,
						error: { email: "کاربری با این ایمیل یافت نشد" },
					})
				);
			}

			await db.userTeam.create({ user: user.id, team: team.id });
			return res.status(200).json(
				resModel({
					success: true,
					successMessage: "کاربر با موفقیت اضافه شد",
				})
			);
		} else {
			return res.status(403).json(
				resModel({
					success: false,
					error: "شما دسترسی افزودن کاربر به تیم را ندارید",
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

export const fetchUsers = async (req: Request, res: Response) => {
	try {
		const team = await db.team.findById(req.params.id).populate("admin").exec();
		const teamUsers = await db.userTeam.find({ team: req.params.id }).populate("user").exec();

		if (!team) {
			return res.status(404).json(
				resModel({
					success: false,
					error: "تیم مورد نظر یافت نشد",
				})
			);
		}

		return res.status(200).json(
			resModel({
				success: true,
				data: {
					admin: userTransform(team.admin),
					users: teamUsersTransform(teamUsers),
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

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const team = await db.team.findById(req.params.id);
		if (!team) {
			return res.status(404).json(
				resModel({
					success: false,
					error: "تیم مورد نظر یافت نشد",
				})
			);
		}
		if (team.admin.valueOf() === req.user?.id) {
			const user = await db.user.findOne({ email: req.params.user });
			if (!user) {
				return res.status(404).json(
					resModel({
						success: false,
						error: { email: "کاربری با این ایمیل یافت نشد" },
					})
				);
			}

			if (team.admin.valueOf() === user.id.valueOf()) {
				return res.status(403).json(
					resModel({
						success: false,
						error: "شما دسترسی حذف ادمین از تیم را ندارید",
					})
				);
			}

			await db.userTeam.findOneAndDelete({ user: user.id, team: team.id });
			return res.status(200).json(
				resModel({
					success: true,
					successMessage: "کاربر از تیم حذف شد",
				})
			);
		} else {
			return res.status(403).json(
				resModel({
					success: false,
					error: "شما دسترسی حذف کاربر از تیم را ندارید",
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
