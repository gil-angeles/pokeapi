import { Router } from "express";
import z from "zod";
import {
  createFavorites,
  getFavoritesByCode,
  updateFavorites,
} from "../services/favorites.services.js";

const router = Router();

const createSchema = z.object({
  code: z.string(),
  pokemons: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      image: z.string(),
      types: z.array(z.any()).optional(),
    }),
  ),
});

router.post("/", async (req, res) => {
  try {
    const parsed = createSchema.parse(req.body);

    const list = await createFavorites(parsed.code, parsed.pokemons);

    res.json({ code: list.code });
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  const list = await getFavoritesByCode(code);

  if (!list) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(list);
});

router.patch("/:code", async (req, res) => {
  try {
    const parsed = createSchema.parse(req.body);

    const updated = await updateFavorites(req.params.code, parsed.pokemons);

    res.json(updated);
  } catch {
    res.status(400).json({ error: "Invalid data" });
  }
});

export default router;
