import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import testRoute from './routes/TestRoute';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use('/api', [testRoute]);

const PORT = process.env.NODE_PUBLIC_PORT;
const DB_URL = process.env.NODE_PUBLIC_DB_URL as string;

mongoose
	.connect(DB_URL)
	.then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
	.catch((error) => console.log(error.message));
