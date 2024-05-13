import { Request, Response } from "express";
import { sendNotifications } from "../services/notification.service";

export const createNotification = async (req: Request, res: Response) => {
  try {
    const { category, message } = req.body;
    await sendNotifications(category, message);
    res.status(201).send({ message: "Notifications sent!" });
  } catch (error) {
    res.status(500).send(error);
  }
};
