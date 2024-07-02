import { Request as expressRequest } from "express";
import { IUser } from "../models/UserModel";

export interface Request extends expressRequest {
	user?: IUser;
}
