import { IUser } from "../models/UserModel";

declare global {
	namespace Express {
		export interface Request {
			user?: IUser;
		}
	}
}

export {};
