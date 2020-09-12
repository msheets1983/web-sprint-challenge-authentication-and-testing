const server = require("../api/server");
const express = require("express");
const supertest = require("supertest");
const db = require("../database/dbConfig");

describe("Get request", () => {
  it("returns 401 if no session is found", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.statusCode).toBe(401);
  });
  it("returns a JSON object", async () => {
    const res = await supertest(server).get("/api/jokes");
    expect(res.type).toBe("application/json");
  });
});

describe("Register", () => {
  it("returns 500 if username already exists", async () => {
    const data = { username: "JohnDoe", password: "test123" };
    const res = await supertest(server).post("/api/auth/register").send(data);
    expect(res.statusCode).toBe(500);
  });
  it("returns 500 if no username is entered", async () => {
    const data = { password: "test123" };
    const res = await supertest(server).post("/api/auth/register").send(data);
    expect(res.statusCode).toBe(500);
  });
  it("returns 500 if no password is entered", async () => {
    const data = { username: "JohnDoe" };
    const res = await supertest(server).post("/api/auth/register").send(data);
    expect(res.statusCode).toBe(500);
  });

  it("returns a json object", async () => {
    const data = { username: "JohnDoe", password: "test123" };
    const res = await supertest(server).post("/api/auth/register").send(data);
    expect(res.type).toBe("application/json");
  });
});

describe("Login", () => {
  it("returns 401 if username does not exist", async () => {
    const data = { username: "david1234", password: "david" };
    const res = await supertest(server).post("/api/auth/login").send(data);
    expect(res.statusCode).toBe(401);
  });
  it("returns 500 if no password is entered", async () => {
    const data = { username: "JohnDoe" };
    const res = await supertest(server).post("/api/auth/login").send(data);
    expect(res.statusCode).toBe(500);
  });
  it("returns 500 if no username is entered", async () => {
    const data = { password: "david" };
    const res = await supertest(server).post("/api/auth/login").send(data);
    expect(res.statusCode).toBe(500);
  });
  it("returns 500 if no password is entered", async () => {
    const data = { username: "david" };
    const res = await supertest(server).post("/api/auth/login").send(data);
    expect(res.type).toBe("application/json");
  });
});
