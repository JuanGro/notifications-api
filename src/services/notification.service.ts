import database from "../config/database.connection";
import Category from "../models/category.model";
import Email from "../models/email.model";
import PushNotification from "../models/push-notification.model";
import Sms from "../models/sms.model";
import { getUsersByCategorySubscribed } from "./user.service";

export const sendNotifications = async (
  category: Category,
  message: string
) => {
  const users = await getUsersByCategorySubscribed(category.name);
  const now = new Date();
  const notifications: (Email | Sms | PushNotification)[] = [];
  users.map((user) => {
    user.channels.map(async (channel) => {
      switch (channel.name) {
        case "E-Mail":
          const email = new Email(
            message,
            now,
            category,
            channel,
            user,
            "sender@gmail.com",
            user.email,
            "Notification",
            message
          );
          notifications.push(email);
          break;
        case "SMS":
          const sms = new Sms(
            message,
            now,
            category,
            channel,
            user,
            "323",
            user.phoneNumber
          );
          notifications.push(sms);
          break;
        case "Push Notification":
          const pushNotification = new PushNotification(
            message,
            now,
            category,
            channel,
            user,
            user.deviceId
          );
          notifications.push(pushNotification);
          break;
      }
    });
  });
  await saveNotifications(notifications);
};

export const saveNotifications = async (notifications: (Email | Sms | PushNotification)[]) => {
  await database.collection("notifications").insertMany(notifications);
};
