import { useInfiniteQuery } from "@tanstack/react-query";

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type PokemonListItem = {
  id: number;
  name: string;
  image: string;
  sprites?: any;
  types?: any[];
};

const getIdFromUrl = (url: string) => {
  const parts = url.split("/");
  return Number(parts[parts.length - 2]);
};

export function usePokemonList() {
  return useInfiniteQuery({
    queryKey: ["pokemon-list"],

    initialPageParam: "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",

    queryFn: async ({ pageParam }) => {
      const res = await fetch(pageParam as string);

      if (!res.ok) {
        throw new Error("Failed to fetch Pokémon");
      }

      const data: PokemonListResponse = await res.json();

      const pokemon = await Promise.all(
        data.results.map(async (p) => {
          const id = getIdFromUrl(p.url);

          const detailRes = await fetch(p.url);
          const detail = await detailRes.json();

          return {
            id,
            name: p.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            types: detail.types,
          };
        }),
      );

      return {
        pokemon,
        next: data.next,
      };
    },

    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });
}
