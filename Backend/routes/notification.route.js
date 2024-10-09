import { Router } from "express";
import isAuthenticated from "../middlewares/userAuthentication.js";
import { getAllNotifications } from "../controllers/notification.controller.js";
export const notificationRouter = Router();

notificationRouter.post(
    "/allnotificactions",
    isAuthenticated,
    getAllNotifications
);
