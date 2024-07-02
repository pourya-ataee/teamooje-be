import express from 'express';
import { changeStatus, fetchStatus } from '../../../../controllers/PomodoroController';

const router = express.Router();
router.post('/status', changeStatus);
router.get('/status', fetchStatus);

export default router;
