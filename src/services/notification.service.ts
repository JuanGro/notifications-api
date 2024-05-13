import database from "../config/database.connection";
import Category from "../models/category.model";
import Channel from "../models/channel.model";
import Email from "../models/email.model";
import Notification from "../models/notification.model";
import PushNotification from "../models/push-notification.model";
import Sms from "../models/sms.model";
import User from "../models/user.model";
import { getUsersByCategorySubscribed } from "./user.service";

export const sendNotifications = async (
  category: Category,
  message: string
) => {
  const notifications: (Email | Sms | PushNotification)[] = [];
  const users = await getUsersByCategorySubscribed(category.name);
  const time = new Date();
  users.map((user) => {
    user.channels.map((channel) => {
      let notification: Notification = {
        message,
        time,
        category,
        channel,
        user,
      };
      const newNotification = createNotification(channel, notification, user);
      notifications.push(newNotification);
    });
  });
  await saveNotifications(notifications);
};

export const createNotification = (
  channel: Channel,
  notification: Notification,
  user: User
) => {
  let newNotification;
  switch (channel.name) {
    case "E-Mail":
      const email: Email = {
        ...notification,
        sender: "sender@sample.com",
        receiver: user.email,
        subject: "Sample subject",
        body: notification.message,
      };
      newNotification = email;
      break;
    case "SMS":
      const sms: Sms = {
        ...notification,
        sender: "sample number",
        receiver: user.phoneNumber,
      };
      newNotification = sms;
      break;
    case "Push Notification":
      const pushNotification: PushNotification = {
        ...notification,
        deviceId: user.deviceId,
      };
      newNotification = pushNotification;
      break;
    default:
      throw new Error("Notification type not recognized!");
  }
  return newNotification;
};

export const saveNotifications = async (
  notifications: (Email | Sms | PushNotification)[]
) => {
  await database.collection("notifications").insertMany(notifications);
};
