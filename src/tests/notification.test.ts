import request from "supertest";
import database, { client } from "../config/database.connection";
import app, { server } from "..";
import { usersData } from "../.data/users.data";
import { categoriesData } from "../.data/categories.data";
import { channelsData } from "../.data/channels.data";
import { notificationData } from "../.data/notification.data";

describe("Notifications", () => {
  beforeAll(async () => {
    await database.collection("categories").deleteMany({});
    await database.collection("channels").deleteMany({});
    await database.collection("users").deleteMany({});
    await database.collection("notifications").deleteMany({});
    await database.collection("categories").insertMany(categoriesData);
    await database.collection("channels").insertMany(channelsData);
    await database.collection("users").insertMany(usersData);
  });

  afterAll(async () => {
    await client.close();
    server.close();
  });

  beforeEach(async () => {
    await database.collection("notifications").deleteMany({});
  });

  describe("Database", () => {
    it("should create a notification", async () => {
      await database.collection("notifications").insertOne(notificationData);
      expect(
        (await database.collection("notifications").find({}).toArray()).length
      ).toBe(1);
    });

    it("should create three notifications", async () => {
      await database
        .collection("notifications")
        .insertMany([
          { category: {name: 'Finance'}, message: 'Lorem ipsum' },
          { category: {name: 'Finance'}, message: 'Lorem ipsum' },
          { category: {name: 'Sports'}, message: 'Lorem ipsum' },
        ]);
      expect(
        (await database.collection("notifications").find({}).toArray()).length
      ).toBe(3);
    });

    it("should delete all notifications", async () => {
      await database.collection("notifications").insertOne(notificationData);
      await database.collection("notifications").deleteMany({});
      expect(
        (await database.collection("notifications").find({}).toArray()).length
      ).toBe(0);
    });
  });

  describe("Endpoints", () => {
    it("should save notifications", async () => {
      const res = await request(app)
        .post("/api/v1/notifications")
        .send(notificationData);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toStrictEqual({ message: "Notifications sent!" });
      expect(
        (await database.collection("notifications").find({}).toArray()).length
      ).toBe(9);
    });

    it("should get an error if empty body is sent", async () => {
      const res = await request(app).post("/api/v1/notifications").send({});
      expect(res.statusCode).toEqual(500);
      expect(
        (await database.collection("notifications").find({}).toArray()).length
      ).toBe(0);
    });
  });
});
