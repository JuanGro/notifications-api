import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.DB_URL ?? '');

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

const database = client.db(`${process.env.DB_NAME}_${process.env.NODE_ENV}`);

export default database;
export { client };
