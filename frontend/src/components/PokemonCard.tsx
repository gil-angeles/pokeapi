import { useState } from "react";
import { Heart } from "lucide-react";
import type { PokemonListItem } from "../hooks/usePokemonList";
import { useFavorites } from "./FavoritesContext";
import PokemonDetailModal from "./PokemonDetailModal";

type Props = {
  pokemon: PokemonListItem;
};

export default function PokemonCard({ pokemon }: Props) {
  const [open, setOpen] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorite = isFavorite(pokemon.id);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="relative bg-white rounded-3xl p-6 border border-pokedex-charcoal/10 shadow-sm hover:shadow-lg transition-all cursor-pointer"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();

            if (favorite) {
              removeFavorite(pokemon.id);
            } else {
              addFavorite(pokemon);
            }
          }}
          className="absolute top-4 right-4 z-10"
          aria-label="Toggle favorite"
        >
          <Heart
            size={22}
            fill={favorite ? "#ec4026" : "transparent"}
            stroke="#ec4026"
          />
        </button>

        <div className="h-40 flex items-center justify-center mb-4">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="h-full object-contain"
          />
        </div>

        <div className="text-center">
          <p className="text-sm font-bold text-pokedex-red mb-1">
            #{pokemon.id.toString().padStart(3, "0")}
          </p>

          <h3 className="text-xl font-extrabold capitalize text-pokedex-charcoal">
            {pokemon.name}
          </h3>
        </div>
      </div>

      {open && (
        <PokemonDetailModal
          name={pokemon.name}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
