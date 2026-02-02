import { TYPE_COLORS } from "../constants/pokemonTypes";
import { useState } from "react";
import PokemonDetailModal from "./PokemonDetailModal";

type Props = {
  pokemon: any;
};

export default function FavoriteCard({ pokemon }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="bg-white rounded-2xl border-2 border-slate-200 hover:border-pokedex-yellow hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
      >
        <div className="w-full aspect-square bg-slate-50 flex items-center justify-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-3/4 h-3/4 object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        <div className="px-4 py-3">
          <p className="text-xs text-slate-400 font-black uppercase tracking-widest">
            #{pokemon.id.toString().padStart(4, "0")}
          </p>

          <p className="text-lg font-black capitalize text-pokedex-charcoal group-hover:text-blue-600 transition-colors">
            {pokemon.name}
          </p>

          <div className="flex gap-2 mt-2">
            {pokemon.types.map((t: any) => (
              <span
                key={t.type.name}
                className={`px-2 py-1 text-xs font-black rounded-md uppercase tracking-tighter text-white ${
                  TYPE_COLORS[t.type.name] ?? "bg-gray-400"
                }`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      {open && (
        <PokemonDetailModal
          name={pokemon.name}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
