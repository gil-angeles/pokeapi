interface Props {
  stats: any[];
}

export default function PokemonStatsCard({ stats }: Props) {
  const total = stats.reduce((sum, s) => sum + s.base_stat, 0);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl">
      <h2 className="text-2xl font-black uppercase mb-6">Base Stats</h2>

      <div className="space-y-6">
        {stats.map((s) => (
          <div
            key={s.stat.name}
            className="grid grid-cols-12 items-center gap-4"
          >
            <div className="col-span-3 text-xs font-black uppercase text-gray-500">
              {s.stat.name.replace("-", " ")}
            </div>

            <div className="col-span-1 font-bold">{s.base_stat}</div>

            <div className="col-span-8 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-pokedex-yellow"
                style={{
                  width: `${(s.base_stat / 255) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs uppercase font-bold text-gray-400">
        Base Stats Total: {total}
      </p>
    </div>
  );
}
