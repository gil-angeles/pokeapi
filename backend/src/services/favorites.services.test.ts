import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  createFavorites,
  getFavoritesByCode,
  updateFavorites,
} from "../services/favorites.services.js";
import { prisma } from "../lib/prisma.js";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    favoritesList: {
      upsert: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe("favorites.services", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("createFavorites calls prisma.upsert correctly", async () => {
    const mockResult = { code: "ABC123", pokemons: [] };

    vi.mocked(prisma.favoritesList.upsert).mockResolvedValue(mockResult as any);

    const result = await createFavorites("ABC123", []);

    expect(prisma.favoritesList.upsert).toHaveBeenCalledWith({
      where: { code: "ABC123" },
      update: { pokemons: [] },
      create: { code: "ABC123", pokemons: [] },
    });

    expect(result).toEqual(mockResult);
  });

  it("getFavoritesByCode calls prisma.findUnique correctly", async () => {
    const mockResult = { code: "ABC123", pokemons: [] };

    vi.mocked(prisma.favoritesList.findUnique).mockResolvedValue(
      mockResult as any,
    );

    const result = await getFavoritesByCode("ABC123");

    expect(prisma.favoritesList.findUnique).toHaveBeenCalledWith({
      where: { code: "ABC123" },
    });

    expect(result).toEqual(mockResult);
  });

  it("updateFavorites calls prisma.update correctly", async () => {
    const mockResult = { code: "ABC123", pokemons: [{ id: 1 }] };

    vi.mocked(prisma.favoritesList.update).mockResolvedValue(mockResult as any);

    const result = await updateFavorites("ABC123", [{ id: 1 }]);

    expect(prisma.favoritesList.update).toHaveBeenCalledWith({
      where: { code: "ABC123" },
      data: { pokemons: [{ id: 1 }] },
    });

    expect(result).toEqual(mockResult);
  });
});
