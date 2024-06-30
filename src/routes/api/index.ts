import express from "express";
import webRoute from "./web";
// import { authMiddleware } from "../../middleware/Authentication";

const router = express.Router();

router.use("/api", webRoute);

export default router;
