import express from 'express';
import { changeStatus } from '../controllers/PomodoroController';

const router = express.Router();
router.post('/status', changeStatus);

export default router;
