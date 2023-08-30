import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserAttributes } from '../models/UserModel';

dotenv.config();

export const authTransform = (item: UserAttributes) => {
	return {
		username: item.username,
		email: item.email,
		token: jwt.sign({ userId: item.id }, process.env.NODE_PRIVATE_SECRET as string, { expiresIn: '168h' }),
	};
};

export const userTransform = (item: UserAttributes) => {
	return {
		id: item.id,
		username: item.username,
		email: item.email,
	};
};

export const usersTransform = (items: UserAttributes[]) => {
	return items.map((user) => {
		return {
			id: user.id,
			username: user.username,
			email: user.email,
		};
	});
};
