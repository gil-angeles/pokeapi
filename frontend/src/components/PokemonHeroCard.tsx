import { TYPE_COLORS } from "../constants/pokemonTypes";

interface Props {
  pokemon: any;
  species: any;
}

export default function PokemonHeroCard({ pokemon, species }: Props) {
  const genus = species.genera.find(
    (g: any) => g.language.name === "en",
  )?.genus;

  return (
    <>
      <div className="bg-white rounded-3xl p-8 shadow-xl relative min-h-[420px] flex items-center justify-center">
        <div className="absolute top-4 right-4 bg-gray-100 rounded-full px-4 py-1 text-sm font-black text-gray-400 italic">
          #{pokemon.id.toString().padStart(3, "0")}
        </div>

        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          className="max-w-[320px] drop-shadow-2xl"
        />
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="mb-4">
          <h1 className="text-4xl font-black uppercase">{pokemon.name}</h1>
          <p className="text-pokedex-blue font-bold italic">{genus}</p>
        </div>

        <div className="flex gap-3 mb-6">
          {pokemon.types.map((t: any) => (
            <div
              key={t.type.name}
              className={`px-6 py-2 rounded-full text-white font-black uppercase tracking-widest text-[10px] shadow-sm ${
                TYPE_COLORS[t.type.name] ?? "bg-gray-400"
              }`}
            >
              {t.type.name}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-2xl text-center">
            <p className="text-xs font-black uppercase text-gray-400">Height</p>
            <p className="text-xl font-black">{pokemon.height / 10} m</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl text-center">
            <p className="text-xs font-black uppercase text-gray-400">Weight</p>
            <p className="text-xl font-black">{pokemon.weight / 10} kg</p>
          </div>
        </div>
      </div>
    </>
  );
}
