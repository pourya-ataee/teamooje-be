import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserDocument } from '../models/UserModel';

dotenv.config();

export const authTransform = (item: UserDocument) => {
	return {
		name: item.name,
		email: item.email,
		token: jwt.sign({ user_id: item._id }, process.env.NODE_PRIVATE_SECRET as string, { expiresIn: '110h' }),
	};
};
