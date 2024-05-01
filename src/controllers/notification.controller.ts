import { Request, Response } from "express";
import Notification from "../models/notification.model";
import User from "../models/user.model";
import database from "../config/mongodb.connection";

export const createNotification = async (req: Request, res: Response) => {
  try {
    const notificationsToSend: Notification[] = [];
    const { message, category } = req.body;
    const users = (await database
      .collection("users")
      .find({ "subscribed.name": req.body.category.name })
      .toArray()) as unknown as User[];
    users.map((user) => {
      user.channels.map((channel) => {
        const logText = `LOG: USER: ${user.email} | CHANNEL: ${channel.name} | CATEGORY: ${category.name} | MESSAGE: ${message}`;
        notificationsToSend.push({
          message,
          category,
          user,
          channel,
          logText,
        });
      });
    });
    database.collection("notifications").insertMany(notificationsToSend);
    res.status(201).send({ message: "Notifications sent!" });
  } catch (error) {
    res.status(500).send(error);
  }
};
