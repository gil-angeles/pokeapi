import { useFavorites } from "./FavoritesContext";
import { useSearch } from "./SearchContext";

export default function Header() {
  const { code } = useFavorites();
  const { search, setSearch } = useSearch();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleClear = () => {
    setSearch("");
  };

  return (
    <header className="sticky top-0 z-10 bg-pokedex-white border-b border-black/10 px-10 py-6">
      <div className="flex items-center justify-between gap-6">
        <div className="relative group max-w-2xl w-full">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-pokedex-charcoal/40 group-focus-within:text-pokedex-red transition-colors">
            search
          </span>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Pokemon by name..."
            className="
              w-full
              h-14
              pl-14
              pr-6
              rounded-2xl
              bg-white
              border
              border-pokedex-charcoal/10
              text-pokedex-charcoal
              font-medium
              shadow-sm
              transition-all
              focus:outline-none
              focus:ring-4
              focus:ring-pokedex-red/20
              focus:border-pokedex-red
            "
          />
        </div>
        <button
          onClick={handleClear}
          className="bg-pokedex-yellow text-pokedex-charcoal font-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#003A70] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#003A70] transition-all"
        >
          Clear
        </button>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold uppercase text-pokedex-charcoal/60">
              Current Favorites Code
            </p>
            <p className="text-2xl font-black tracking-widest text-pokedex-red">
              {code}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="bg-pokedex-yellow text-pokedex-charcoal font-black px-6 py-3 rounded-xl shadow-[4px_4px_0px_0px_#003A70] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#003A70] transition-all"
          >
            Copy Code
          </button>
        </div>
      </div>
    </header>
  );
}
