import { UserAttributes } from '../models/UserModel';

declare global {
	namespace Express {
		export interface Request {
			user?: UserAttributes;
		}
	}
}

export {};
