import express from "express";
import authRoute from "./AuthRoute";
import teamRoute from "./TeamRoute";
import userRoute from "./UserRoute";
import pomodoroRoute from "./PomodoroRoute";
import { authMiddleware } from "../../../../middleware/Authentication";

const router = express.Router();

router.use("/v1/auth", authRoute);
router.use("/v1/user", authMiddleware, userRoute);
router.use("/v1/team", authMiddleware, teamRoute);
router.use("/v1/pomodoro", authMiddleware, pomodoroRoute);

export default router;
