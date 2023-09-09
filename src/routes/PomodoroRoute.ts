import express from 'express';
import { changeStatus, getStatus } from '../controllers/PomodoroController';

const router = express.Router();
router.post('/status', changeStatus);
router.get('/status', getStatus);

export default router;
