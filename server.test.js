// backend/server.test.js
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import mongoose from "mongoose";
import app from "./server.js";

describe("🔹 Full API & Security Tests", () => {
  test("GET /api/users should return 200", async () => {
    const res = await request(app).get("/api/users");
    assert.equal(res.statusCode, 200);
  });

  test("POST /api/auth/register should return 400 if missing fields", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com" }); // missing password
    assert.equal(res.statusCode, 400);
  });

  test("Server should handle 404", async () => {
    const res = await request(app).get("/api/does-not-exist");
    assert.equal(res.statusCode, 404);
  });
});

test("cleanup", async () => {
  await mongoose.connection.close();
});
