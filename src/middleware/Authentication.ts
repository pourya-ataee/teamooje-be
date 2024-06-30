import { NextFunction } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

export interface ISocket extends Socket {
	// decoded?: string | JwtPayload;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	
};

export const socketAuthMiddleware = (socket: ISocket, next: (err?: ExtendedError | undefined) => void) => {
	if (socket.handshake.query && socket.handshake.query.token) {
		// jwt.verify(socket.handshake.query.token as string, process.env.NODE_PRIVATE_SECRET as string, async (err, decoded) => {
		// 	if (err) return next(new Error("Authentication error"));
		// 	const user = await db.user.findOne({ where: { id: (decoded as { userId: number }).userId } });
		// 	if (!user) return next(new Error("Authentication error"));
		// 	socket.decoded = decoded;
		// 	next();
		// });
	} else {
		next(new Error("Authentication error"));
	}
};
