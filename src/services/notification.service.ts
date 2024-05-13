import database from "../config/database.connection";
import Category from "../models/category.model";
import Notification from "../models/notification.model";
import { getUsersByCategorySubscribed } from "./user.service";

export const sendNotifications = async (
  category: Category,
  message: string
) => {
  const users = await getUsersByCategorySubscribed(category.name);
  const notificationsToSend: Notification[] = [];
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
};
