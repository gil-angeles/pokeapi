import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { loadFavorites, saveFavorites } from "../api/api";
import { generateCode } from "../utils/generateCode";
import toast from "react-hot-toast";

export type PokemonListItem = {
  id: number;
  name: string;
  image: string;
  types?: any[];
};

type FavoritesContextType = {
  favorites: PokemonListItem[];
  setFavorites: (list: PokemonListItem[]) => void;
  addFavorite: (pokemon: PokemonListItem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  code: string;
  regenerateCode: () => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<PokemonListItem[]>([]);

  const [code, setCode] = useState<string>(() => {
    const stored = localStorage.getItem("favorites-code");
    if (stored) return stored;

    const newCode = generateCode();
    localStorage.setItem("favorites-code", newCode);
    return newCode;
  });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await loadFavorites(code);

        setFavorites(data.pokemons || []);
      } catch {
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [code]);

  const persist = async (updated: PokemonListItem[]) => {
    try {
      await saveFavorites(code, updated);
    } catch (err) {
      console.error(err);
    }
  };

  const regenerateCode = () => {
    const newCode = generateCode();
    localStorage.setItem("favorites-code", newCode);
    setCode(newCode);
    setFavorites([]);
  };

  const addFavorite = (pokemon: PokemonListItem) => {
    const exists = favorites.some((p) => p.id === pokemon.id);
    if (exists) {
      toast("Already in favorites");
      return;
    }

    const updated = [...favorites, pokemon];
    setFavorites(updated);
    persist(updated);

    toast.success(`${pokemon.name} added to favorites`);
  };

  const removeFavorite = (id: number) => {
    const removed = favorites.find((p) => p.id === id);
    if (!removed) return;

    const updated = favorites.filter((p) => p.id !== id);
    setFavorites(updated);
    persist(updated);

    toast(`${removed.name} removed from favorites`);
  };

  const isFavorite = (id: number) => favorites.some((p) => p.id === id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        code,
        regenerateCode,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be inside FavoritesProvider");
  return context;
}
