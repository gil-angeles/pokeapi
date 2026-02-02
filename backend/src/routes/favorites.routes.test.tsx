import request from "supertest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import express from "express";
import router from "../routes/favorites.routes.js";
import * as services from "../services/favorites.services.js";

vi.mock("../services/favorites.services.js", () => ({
  createFavorites: vi.fn(),
  getFavoritesByCode: vi.fn(),
  updateFavorites: vi.fn(),
}));

const app = express();
app.use(express.json());
app.use("/favorites", router);

describe("favorites routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("POST /favorites creates list", async () => {
    vi.mocked(services.createFavorites).mockResolvedValue({
      id: "1",
      code: "ABC123",
      pokemons: [],
      createdAt: new Date(),
    } as any);

    const res = await request(app).post("/favorites").send({
      code: "ABC123",
      pokemons: [],
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ code: "ABC123" });
  });

  it("POST /favorites returns 400 for invalid data", async () => {
    const res = await request(app).post("/favorites").send({
      invalid: true,
    });

    expect(res.status).toBe(400);
  });

  it("GET /favorites/:code returns list", async () => {
    vi.mocked(services.getFavoritesByCode).mockResolvedValue({
      id: "1",
      code: "ABC123",
      pokemons: [],
      createdAt: new Date(),
    } as any);

    const res = await request(app).get("/favorites/ABC123");

    expect(res.status).toBe(200);
    expect(res.body.code).toBe("ABC123");
  });

  it("GET /favorites/:code returns 404 when not found", async () => {
    vi.mocked(services.getFavoritesByCode).mockResolvedValue(null);

    const res = await request(app).get("/favorites/NOTFOUND");

    expect(res.status).toBe(404);
  });

  it("PATCH /favorites/:code updates list", async () => {
    vi.mocked(services.updateFavorites).mockResolvedValue({
      id: "1",
      code: "ABC123",
      pokemons: [{ id: 1 }],
      createdAt: new Date(),
    } as any);

    const res = await request(app)
      .patch("/favorites/ABC123")
      .send({
        code: "ABC123",
        pokemons: [{ id: 1, name: "bulbasaur", image: "img.png" }],
      });

    expect(res.status).toBe(200);
    expect(res.body.code).toBe("ABC123");
  });

  it("PATCH /favorites/:code returns 400 for invalid data", async () => {
    const res = await request(app)
      .patch("/favorites/ABC123")
      .send({ invalid: true });

    expect(res.status).toBe(400);
  });
});
