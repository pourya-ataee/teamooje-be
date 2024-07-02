import jwt from "jsonwebtoken";
import { ITeam } from "../models/TeamModel";
import { IPomodoro, IUser } from "../models/UserModel";
import { IUserTeam } from "../models/UserTeamModel";

export const authTransform = (item: IUser) => {
	return {
		username: item.username,
		email: item.email,
		token: jwt.sign({ userId: item._id }, process.env.SECRET_KEY as string, { expiresIn: "168h" }),
	};
};

export const userTransform = (item: IUser) => {
	return {
		id: item.id,
		username: item.username,
		email: item.email,
	};
};

export const teamUsersTransform = (items: IUserTeam[]) => {
	return items.map((userTeam) => {
		return {
			id: userTeam.user.id,
			username: userTeam.user.username,
			email: userTeam.user.email,
		};
	});
};

export const userTeamsTransform = (items: IUserTeam[]) => {
	return items.map((userTeam) => {
		return {
			id: userTeam.team.id,
			name: userTeam.team.name,
			description: userTeam.team.description,
			admin: userTransform(userTeam.team.admin),
		};
	});
};

export const pomodoroTransform = (item: IPomodoro) => {
	return {
		duration: item.duration,
		counting: item.counting,
		remaining: item.remaining,
		state: item.state,
	};
};

export const teamTransform = (item: ITeam) => {
	return {
		name: item.name,
		admin: item.admin,
		...(!!item.description && { description: item.description }),
	};
};
