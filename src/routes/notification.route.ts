import { Router } from "express";
import { createNotification } from "../controllers/notification.controller";

export const notificationRouter = Router();

notificationRouter.post('/', createNotification)