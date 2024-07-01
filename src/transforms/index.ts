import jwt from "jsonwebtoken";
import { IUser } from "../models/UserModel";
import { ITeam } from "../models/TeamModel";

export const authTransform = (item: IUser) => {
	return {
		username: item.username,
		email: item.email,
		token: jwt.sign({ userId: item._id }, process.env.SECRET_KEY as string, { expiresIn: "168h" }),
	};
};

// export const userTransform = (item: IUser) => {
// 	return {
// 		id: item.id,
// 		username: item.username,
// 		email: item.email,
// 	};
// };

// export const teamsTransform = (items: ITeam[]) => {
// 	return items.map((team) => {
// 		return {
// 			id: team.id,
// 			name: team.name,
// 			description: team.description,
// 			admin: userTransform(team.admin),
// 		};
// 	});
// };
