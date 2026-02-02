import { prisma } from "../lib/prisma.js";

export async function createFavorites(code: string, pokemons: any[]) {
  return prisma.favoritesList.upsert({
    where: { code },
    update: { pokemons },
    create: { code, pokemons },
  });
}

export async function getFavoritesByCode(code: string) {
  return prisma.favoritesList.findUnique({
    where: { code },
  });
}

export async function updateFavorites(code: string, pokemons: any[]) {
  return prisma.favoritesList.update({
    where: { code },
    data: { pokemons },
  });
}
