export default function ExploreHeader() {
  return (
    <div className="py-10">
      <div className="flex items-center gap-4 mb-3">
        <div className="h-10 w-3 bg-pokedex-red rounded-full" />

        <h2 className="text-5xl font-black text-pokedex-charcoal uppercase tracking-tight italic">
          Explore
        </h2>
      </div>

      <p className="text-pokedex-charcoal/60 text-xl font-medium max-w-xl">
        All the Pokémon data you'll ever need in one place
      </p>
    </div>
  );
}
