import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserAttributes } from '../models/UserModel';

dotenv.config();

export const authTransform = (item: UserAttributes) => {
	return {
		username: item.username,
		email: item.email,
		// token: jwt.sign({ user_id: item.id }, process.env.NODE_PRIVATE_SECRET as string, { expiresIn: '110h' }),
	};
};
