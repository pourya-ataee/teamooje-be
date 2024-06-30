import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import { MONGO_URI } from "./config";
import cookieParser from "cookie-parser";
import testRoute from "./routes/TestRoute";
import authRoute from "./routes/AuthRoute";
import teamRoute from "./routes/TeamRoute";
import userRoute from "./routes/UserRoute";
import pomodoroRoute from "./routes/PomodoroRoute";
import { connection } from "./controllers/SocketController";
import { authMiddleware, socketAuthMiddleware } from "./middleware/Authentication";

require("dotenv").config();
const app = require("express")();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/api", testRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", authMiddleware, userRoute);
app.use("/api/team", authMiddleware, teamRoute);
app.use("/api/pomodoro", authMiddleware, pomodoroRoute);

const httpServer = createServer(app);
const io = new Server(httpServer);
io.use(socketAuthMiddleware).on("connection", connection);

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Synced db.");
		const SERVER_PORT = process.env.SERVER_PORT;
		httpServer.listen(SERVER_PORT, () => {
			console.log(`server running on port ${SERVER_PORT}`);
		});
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});
