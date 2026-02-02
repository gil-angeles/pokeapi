import { useEffect } from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useFavorites } from "./FavoritesContext";

import PokemonHeroCard from "./PokemonHeroCard";
import PokemonStatsCard from "./PokemonStatsCard";
import PokemonAbilitiesCard from "./PokemonAbilitiesCard";

import { getPokemonByName, getSpeciesByName } from "../api/api";

type Props = {
  name: string;
  onClose: () => void;
};

export default function PokemonDetailModal({ name, onClose }: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const { data: pokemon, isLoading: loadingPokemon } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonByName(name),
    enabled: !!name,
  });

  const { data: species, isLoading: loadingSpecies } = useQuery({
    queryKey: ["species", name],
    queryFn: () => getSpeciesByName(name),
    enabled: !!name,
  });

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = pokemon ? isFavorite(pokemon.id) : false;

  const loading = loadingPokemon || loadingSpecies;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-[1200px] bg-pokedex-white rounded-3xl border border-black/10 shadow-xl overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-black/10 bg-pokedex-white">
          <div className="font-black uppercase tracking-tight text-pokedex-charcoal">
            Pokémon Details
          </div>

          <div className="flex items-center gap-4">
            {pokemon && (
              <button
                onClick={() => {
                  if (favorite) {
                    removeFavorite(pokemon.id);
                  } else {
                    addFavorite({
                      id: pokemon.id,
                      name: pokemon.name,
                      image:
                        pokemon.sprites.other["official-artwork"].front_default,
                      types: pokemon.types,
                    });
                  }
                }}
                className="transition-all hover:scale-110"
              >
                <Heart
                  size={26}
                  fill={favorite ? "#ec4026" : "transparent"}
                  stroke="#ec4026"
                />
              </button>
            )}

            <button
              onClick={onClose}
              className="text-pokedex-red hover:scale-105 transition-transform"
              aria-label="Close"
            >
              <X size={26} />
            </button>
          </div>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">
          {loading && <div className="p-10 font-bold">Loading...</div>}

          {!loading && pokemon && species && (
            <div className="min-h-full bg-gradient-to-br from-red-50 to-orange-50 p-8">
              <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <PokemonHeroCard pokemon={pokemon} species={species} />
                  </div>

                  <div className="lg:col-span-7 flex flex-col gap-8">
                    <PokemonStatsCard stats={pokemon.stats} />
                    <PokemonAbilitiesCard abilities={pokemon.abilities} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && (!pokemon || !species) && (
            <div className="p-10">
              <p className="font-bold text-pokedex-red">
                Could not load this Pokémon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
