import { Request, Response } from "express";
import mongoose from "mongoose";

const test = (req: Request, res: Response) => {
	const state = mongoose.connection.readyState;
	switch (state) {
		case 1:
			return res.status(200).json("Connection has been established successfully.");
		case 2:
			return res.status(200).json("Connection is establishing.");
		default:
			return res.status(502).json(`Unable to connect to the database`);
	}
};

export default test;
