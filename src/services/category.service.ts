import database from "../config/database.connection";
import Category from "../models/category.model";

export const getAllCategories = async () => {
  const categories: Category[] = (await database
    .collection("categories")
    .find({})
    .toArray()) as unknown as Category[];
  return categories;
};

