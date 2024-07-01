import express from "express";
import { fetchTeams } from "./../../../../controllers/UserController";

const router = express.Router();
router.get("/teams", fetchTeams);

export default router;
