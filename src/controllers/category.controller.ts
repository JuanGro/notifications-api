import { Request, Response } from "express";
import Category from "../models/category.model";
import database from "../config/mongodb.connection";

export const getCategories = async (_: Request, res: Response) => {
  try {
    const categories = (await database
      .collection("categories")
      .find({})
      .toArray()) as unknown as Category[];
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};
