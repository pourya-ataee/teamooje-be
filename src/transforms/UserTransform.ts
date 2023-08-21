import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserDocument } from '../models/UserModel';

dotenv.config();

export const loginTransform = (item: UserDocument) => {
	let token: string = !!item.token ? item.token : jwt.sign({ user_id: item._id }, process.env.NODE_PRIVATE_SECRET as string, { expiresIn: '110h' });
	return {
		name: item.name,
		email: item.email,
		token,
	};
};

export const registerTransform = (item: UserDocument) => {
  
}
