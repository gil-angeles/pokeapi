import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PokemonHeroCard from "../components/PokemonHeroCard";
import PokemonStatsCard from "../components/PokemonStatsCard";
import PokemonAbilitiesCard from "../components/PokemonAbilitiesCard";
import { getPokemonByName, getSpeciesByName } from "../api/api";

export default function PokemonDetailPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const { data: pokemon } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemonByName(name!),

    enabled: !!name,
  });

  const { data: species } = useQuery({
    queryKey: ["species", name],
    queryFn: () => getSpeciesByName(name!),
    enabled: !!name,
  });

  if (!pokemon || !species) return <div className="p-10">Loading...</div>;

  return (
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

        <div className="mt-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-pokedex-red font-black uppercase text-sm hover:-translate-x-1 transition-transform"
          >
            ← Back to Search
          </button>
        </div>
      </div>
    </div>
  );
}
