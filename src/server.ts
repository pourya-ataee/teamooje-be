import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models';
import testRoute from './routes/TestRoute';
import authRoute from './routes/AuthRoute';
import teamRoute from './routes/TeamRoute';
import { authMiddleware } from './middleware/Authentication';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api', testRoute);
app.use('/api/auth', authRoute);
app.use('/api/team', authMiddleware, teamRoute);

const PORT = process.env.NODE_PUBLIC_PORT;

db.sequelize
	.sync({ force: true })
	.then(() => {
		console.log('Synced db.');
		app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
	})
	.catch((err) => {
		console.log('Failed to sync db: ' + err.message);
	});
