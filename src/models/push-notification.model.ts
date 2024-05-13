import Notification from "./notification.model";
import Category from "./category.model";
import Channel from "./channel.model";
import User from "./user.model";

export default class PushNotification extends Notification {
  constructor(
    public message: string,
    public time: Date,
    public category: Category,
    public channel: Channel,
    public user: User,
    public deviceId: string,
  ) {
    super(message, time, category, channel, user);
    this.deviceId = deviceId;
  }
}
