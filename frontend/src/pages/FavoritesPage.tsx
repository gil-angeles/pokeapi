import { useState, useEffect } from "react";
import FavoriteCard from "../components/FavoriteCard";
import { loadFavorites } from "../api/api";
import { useFavorites } from "../components/FavoritesContext";

export default function FavoritesPage() {
  const { favorites, setFavorites, code, regenerateCode } = useFavorites();

  const [inputCode, setInputCode] = useState(code);
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    setInputCode(code);
  }, [code]);

  const handleSync = async () => {
    try {
      setLoading(true);
      setInvalid(false);

      const data = await loadFavorites(inputCode);
      setFavorites(data.pokemons);
    } catch {
      setInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  const handleNewCode = () => {
    regenerateCode();
    setFavorites([]);
    setInvalid(false);
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-black mb-2 text-pokedex-charcoal">
        My Favorites
      </h1>

      <p className="text-slate-500 mb-6">
        Manage your collection across devices with your retrieval code.
      </p>

      <div
        className={`border-4 ${
          invalid ? "border-red-500" : "border-blue-600"
        } bg-blue-50 rounded-2xl p-6 mb-10 max-w-2xl`}
      >
        <p className="text-sm font-black uppercase tracking-widest text-blue-700 mb-4">
          Import Favorites
        </p>

        <div className="flex gap-3">
          <input
            value={inputCode}
            onChange={(e) => {
              setInputCode(e.target.value.toUpperCase());
              setInvalid(false);
            }}
            className={`flex-1 rounded-xl border-2 px-4 h-12 font-bold focus:outline-none ${
              invalid
                ? "border-red-500 focus:ring-red-500"
                : "border-slate-300 focus:ring-blue-500"
            }`}
          />

          <button
            onClick={handleSync}
            className="bg-pokedex-yellow text-pokedex-charcoal font-black px-6 rounded-xl shadow-[4px_4px_0px_0px_#003A70] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#003A70] transition-all"
          >
            {loading ? "Loading..." : "Sync Now"}
          </button>

          <button
            onClick={handleNewCode}
            className="bg-red-500 text-white font-black px-6 rounded-xl shadow-[4px_4px_0px_0px_#003A70] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#003A70] transition-all"
          >
            New Code
          </button>
        </div>

        <p
          className={`text-xs mt-3 font-bold uppercase ${
            invalid ? "text-red-600" : "text-blue-700"
          }`}
        >
          {invalid
            ? "Code not valid."
            : "Changing code or New Code will overwrite current favorites."}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map((pokemon) => (
          <FavoriteCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
