import express from 'express';
import { addUser, createTeam, deleteUser } from '../controllers/TeamController';

const router = express.Router();
router.post('/create', createTeam);
router.put('/:id/user/add', addUser);
router.delete('/:id/:user/delete', deleteUser);

export default router;
