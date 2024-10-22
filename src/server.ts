import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models';
import testRoute from './routes/TestRoute';
import authRoute from './routes/AuthRoute';
import teamRoute from './routes/TeamRoute';
import userRoute from './routes/UserRoute';
import pomodoroRoute from './routes/PomodoroRoute';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { authMiddleware, socketAuthMiddleware } from './middleware/Authentication';
import { connection } from './controllers/socketController';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api', testRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', authMiddleware, userRoute);
app.use('/api/team', authMiddleware, teamRoute);
app.use('/api/pomodoro', authMiddleware, pomodoroRoute);

const PORT = process.env.NODE_PUBLIC_PORT;

const httpServer = createServer(app);
const io = new Server(httpServer);
io.use(socketAuthMiddleware).on('connection', connection);

db.sequelize
	.sync()
	.then(() => {
		console.log('Synced db.');
		httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
	})
	.catch((err) => {
		console.log('Failed to sync db: ' + err.message);
	});
