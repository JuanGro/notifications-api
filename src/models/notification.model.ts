import Category from "./category.model";
import Channel from "./channel.model";
import User from "./user.model";

export default class Notification {
  constructor(
    public message: string,
    public time: Date,
    public category: Category,
    public channel: Channel,
    public user: User
  ) {
    this.message = message;
    this.time = time;
    this.category = category;
    this.channel = channel;
    this.user = user;
  }
}
