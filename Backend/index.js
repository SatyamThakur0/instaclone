import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { app, server } from "./Socket/socket.js";

dotenv.config({});

import { userRouter } from "./routes/user.route.js";
import { postRouter } from "./routes/post.route.js";
import { messageRouter } from "./routes/message.route.js";
import isAuthenticated from "./middlewares/userAuthentication.js";
import { notificationRouter } from "./routes/notification.route.js";

const PORT = process.env.PORT || 8000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(`Database connected...`));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'https://instaclonetanx.vercel.app');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });
const corsOption = {
    origin: "https://instaclonetanx.vercel.app",
    // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    // allowedHeaders: ['Content-Type', 'Authorization'], // Headers allowed in requests
    credentials: true // If you are dealing with cookies or authentication
};
app.use(cors(corsOption));
// app.options('*', cors());  // Handle preflight requests for all routes

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/message", messageRouter);
app.use("/api/notification", notificationRouter);

server.listen(PORT, () => console.log(`Server is live...`));
