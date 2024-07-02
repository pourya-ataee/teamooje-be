import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import webRoute from "./routes/api";
import { MONGO_URI } from "./config";
import cookieParser from "cookie-parser";
import testRoute from "./routes/api/TestRoute";
import { connection } from "./controllers/SocketController";
import { socketAuthMiddleware } from "./middleware/Authentication";

require("dotenv").config();
const app = require("express")();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(webRoute);
app.use(testRoute);

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
