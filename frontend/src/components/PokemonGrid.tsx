import { usePokemonList } from "../hooks/usePokemonList";
import PokemonCard from "./PokemonCard";
import LoadMoreButton from "./LoadMoreButton";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemonByName } from "../api/api";
import { useSearch } from "./SearchContext";

export default function PokemonGrid() {
  const { search } = useSearch();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePokemonList();

  const {
    data: searchedPokemon,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery({
    queryKey: ["pokemon-search", search],
    queryFn: () => getPokemonByName(search.toLowerCase()),
    enabled: search.length > 0,
  });

  useEffect(() => {
    const savedScroll = sessionStorage.getItem("pokedex-scroll");
    const container = document.getElementById("dashboard-scroll");

    if (savedScroll && container) {
      container.scrollTo({
        top: Number(savedScroll),
        behavior: "auto",
      });
    }
  }, []);

  if (search.length > 0) {
    if (searchLoading) {
      return <div className="p-10">Searching...</div>;
    }

    if (searchError || !searchedPokemon) {
      return (
        <div className="p-10 text-pokedex-red font-black">
          Pokémon "{search}" does not exist.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 pt-8">
        <PokemonCard
          pokemon={{
            id: searchedPokemon.id,
            name: searchedPokemon.name,
            image:
              searchedPokemon.sprites.other["official-artwork"].front_default,
            types: searchedPokemon.types,
          }}
        />
      </div>
    );
  }

  if (isLoading) {
    return <div className="p-10">Loading Pokémon...</div>;
  }

  if (isError) {
    return <div className="p-10 text-red-500">Error loading Pokémon</div>;
  }

  const allPokemon = data?.pages.flatMap((page) => page.pokemon) ?? [];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-8 pt-8">
        {allPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {hasNextPage && <LoadMoreButton onClick={() => fetchNextPage()} />}

      {isFetchingNextPage && (
        <div className="text-center mt-6 text-pokedex-charcoal/60">
          Loading more...
        </div>
      )}
    </>
  );
}
