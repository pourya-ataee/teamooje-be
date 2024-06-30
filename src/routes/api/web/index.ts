import express from "express";
import v1Route from "./v1";
// import { authMiddleware } from "../../middleware/Authentication";

const router = express.Router();

router.use("/web", v1Route);

export default router;
