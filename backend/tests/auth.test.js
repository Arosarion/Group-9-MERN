jest.mock("@sendgrid/mail", () => ({
  setApiKey: jest.fn(),
  send: jest.fn().mockResolvedValue(true),
}));

const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("Auth Endpoints", () => {
  // Test data
  const testUser = {
    username: "testuser",
    email: "test@test.com",
    password: "password123",
  };

  //Register
  describe("POST /api/auth/register", () => {
    it("should register a new user successfully", async () => {
      const res = await request(app).post("/api/auth/register").send(testUser);
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.userId).toBeDefined();
    });

    it("should reject missing fields", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@test.com" }); // missing username and password
      expect(res.statusCode).toBe(400);
    });

    it("should reject duplicate email", async () => {
      // Register first time
      await request(app).post("/api/auth/register").send(testUser);
      // Try again with same email
      const res = await request(app).post("/api/auth/register").send(testUser);
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Email already in use");
    });
  });

  //Login
  describe("POST /api/auth/login", () => {
    it("should login successfully with valid credentials", async () => {
      // Register and verify inline
      await request(app).post("/api/auth/register").send(testUser);
      await User.findOneAndUpdate(
        { email: testUser.email },
        { isVerified: true },
      );
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password });
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.accessToken).toBeDefined();
    });

    it("should reject unverified user", async () => {
      await request(app).post("/api/auth/register").send({
        username: "unverified",
        email: "unverified@test.com",
        password: "password123",
      });
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "unverified@test.com", password: "password123" });
      expect(res.statusCode).toBe(403);
      expect(res.body.code).toBe("EMAIL_NOT_VERIFIED");
    });

    it("should reject wrong password", async () => {
      await request(app).post("/api/auth/register").send(testUser);
      await User.findOneAndUpdate(
        { email: testUser.email },
        { isVerified: true },
      );
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: "wrongpassword" });
      expect(res.statusCode).toBe(401);
    });

    it("should reject unknown email", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "nobody@test.com", password: "password123" });
      expect(res.statusCode).toBe(401);
    });
  });

  //Get Profile
  describe("GET /api/auth/profile", () => {
    it("should reject request without token", async () => {
      const res = await request(app).get("/api/auth/profile");
      expect(res.statusCode).toBe(401);
    });

    it("should return profile with valid token", async () => {
      // Register, verify, login to get token
      await request(app).post("/api/auth/register").send(testUser);
      await User.findOneAndUpdate(
        { email: testUser.email },
        { isVerified: true },
      );
      const loginRes = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password });
      const token = loginRes.body.accessToken;

      const res = await request(app)
        .get("/api/auth/profile")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.user.email).toBe(testUser.email);
    });
  });
});
