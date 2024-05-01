import Category from "./category.model";
import Channel from "./channel.model";

export default class User {
  constructor(
    public name: string,
    public email: string,
    public phoneNumber: string,
    public subscribed: Category[],
    public channels: Channel[]
  ) {}
}
