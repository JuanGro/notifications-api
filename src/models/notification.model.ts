import Category from "./category.model";
import Channel from "./channel.model";
import User from "./user.model";

export default class Notification {
  constructor(
    public category: Category,
    public message: string,
    public channel?: Channel,
    public user?: User,
    public logText?: string
  ) {}
}
