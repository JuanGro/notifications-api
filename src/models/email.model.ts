import Notification from "./notification.model";
import Category from "./category.model";
import Channel from "./channel.model";
import User from "./user.model";

export default class Email extends Notification {
  constructor(
    public message: string,
    public time: Date,
    public category: Category,
    public channel: Channel,
    public user: User,
    public sender: string,
    public receiver: string,
    public subject: string,
    public body: string
  ) {
    super(message, time, category, channel, user);
    this.sender = sender;
    this.receiver = receiver;
    this.subject = subject;
    this.body = body;
  }
}
