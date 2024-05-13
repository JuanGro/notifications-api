import { server } from "..";
import { channelsData } from "../.data/channels.data";
import database, { client } from "../config/database.connection";

describe("Channels", () => {
  afterAll(async () => {
    await client.close();
    server.close();
  });

  beforeEach(async () => {
    await database.collection("channels").deleteMany({});
  });

  describe("Database", () => {
    it("should create a channel", async () => {
      await database.collection("channels").insertOne(channelsData[0]);
      expect(
        (await database.collection("channels").find({}).toArray()).length
      ).toBe(1);
    });

    it("should create three channels", async () => {
      await database.collection("channels").insertMany(channelsData);
      expect(
        (await database.collection("channels").find({}).toArray()).length
      ).toBe(3);
    });

    it("should delete all channels", async () => {
      await database.collection("channels").insertMany(channelsData);
      await database.collection("channels").deleteMany({});
      expect(
        (await database.collection("channels").find({}).toArray()).length
      ).toBe(0);
    });
  });
});
