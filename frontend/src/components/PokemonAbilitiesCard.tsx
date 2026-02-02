type Ability = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
};

type Props = {
  abilities: Ability[];
};

export default function PokemonAbilitiesCard({ abilities }: Props) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
      <h2 className="text-2xl font-black uppercase mb-6">Abilities</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {abilities.map((item) => (
          <div
            key={item.ability.name}
            className="p-5 rounded-2xl bg-gray-50 border-l-4 border-pokedex-red shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-black uppercase text-sm">
                {item.ability.name}
              </span>

              {item.is_hidden && (
                <span className="text-[9px] bg-gray-400 text-white px-2 py-0.5 rounded font-black uppercase">
                  Hidden
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
