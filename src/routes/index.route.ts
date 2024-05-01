import { Router } from "express";
import { categoryRouter } from "./category.route";
import { notificationRouter } from "./notification.route";

export const router = Router();

router.use("/categories", categoryRouter);
router.use("/notifications", notificationRouter);
