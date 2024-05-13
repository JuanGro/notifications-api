import database from "../config/database.connection";
import User from "../models/user.model";

export const getUsersByCategorySubscribed = async (categoryName: string) => {
  const users = (await database
    .collection("users")
    .find({ "subscribed.name": categoryName })
    .toArray()) as unknown as User[];
  return users;
};
