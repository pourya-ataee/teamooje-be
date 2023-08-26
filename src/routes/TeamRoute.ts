import express from 'express';
import { createTeam } from '../controllers/TeamController';

const router = express.Router();
router.post('/create', createTeam);

export default router;
