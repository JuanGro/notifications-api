import { server } from "..";
import { usersData } from "../.data/users.data";
import database, { client } from "../config/database.connection";

describe("Channels", () => {
    afterAll(async () => {
      await client.close();
      server.close();
    });
  
    beforeEach(async () => {
      await database.collection("users").deleteMany({});
    });
  
    describe("Database", () => {
      it("should create a channel", async () => {
        await database.collection("users").insertOne(usersData[0]);
        expect(
          (await database.collection("users").find({}).toArray()).length
        ).toBe(1);
      });
  
      it("should create three users", async () => {
        await database.collection("users").insertMany(usersData);
        expect(
          (await database.collection("users").find({}).toArray()).length
        ).toBe(5);
      });
  
      it("should delete all users", async () => {
        await database.collection("users").insertMany(usersData);
        await database.collection("users").deleteMany({});
        expect(
          (await database.collection("users").find({}).toArray()).length
        ).toBe(0);
      });
    });
  });
  