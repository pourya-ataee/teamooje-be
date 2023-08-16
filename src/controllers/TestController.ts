import { Request, Response } from 'express';

const test = (req: Request, res: Response) => {
	res.status(200).json('Service is working');
};

export default test;
