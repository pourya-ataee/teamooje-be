import express from "express";
import authRoute from "./AuthRoute";
import teamRoute from "./TeamRoute";
import userRoute from "./UserRoute";
import pomodoroRoute from "./PomodoroRoute";
// import { authMiddleware } from "../../middleware/Authentication";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/team", teamRoute);
router.use("/pomodoro", pomodoroRoute);

export default router;
