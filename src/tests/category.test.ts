import request from "supertest";
import app, { server } from "..";
import database, { client } from "../config/mongodb.connection";
import { categoriesData } from "../.data/categories.data";

describe("Categories", () => {
  afterAll(async () => {
    await client.close();
    server.close();
  });

  beforeEach(async () => {
    await database.collection("categories").deleteMany({});
  });

  describe("Database", () => {
    it("should create a category", async () => {
      await database.collection("categories").insertOne(categoriesData[0]);
      expect(
        (await database.collection("categories").find({}).toArray()).length
      ).toBe(1);
    });

    it("should create three categories", async () => {
      await database.collection("categories").insertMany(categoriesData);
      expect(
        (await database.collection("categories").find({}).toArray()).length
      ).toBe(3);
    });

    it("should delete all categories", async () => {
      await database.collection("categories").insertMany(categoriesData);
      await database.collection("categories").deleteMany({});
      expect(
        (await database.collection("categories").find({}).toArray()).length
      ).toBe(0);
    });
  });

  describe("Endpoints", () => {
    it("should get an empty categories array", async () => {
      const res = await request(app).get("/api/v1/categories");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(0);
    });

    it("should get a categories array with three elements", async () => {
      await database.collection("categories").insertMany(categoriesData);
      const res = await request(app).get("/api/v1/categories");
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(3);
    });

    it("should get an error if wrong method is sent", async () => {
      const res = await request(app).post("/api/v1/categories");
      expect(res.statusCode).toEqual(404);
    });
  });
});
