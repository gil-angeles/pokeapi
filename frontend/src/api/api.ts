const API_URL = "http://localhost:4000";
const POKEAPI = "https://pokeapi.co/api/v2";

/* POKEAPI */

export async function saveFavorites(code: string, pokemons: any[]) {
  const res = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, pokemons }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    throw new Error("Failed to save favorites");
  }

  return res.json();
}

export async function loadFavorites(code: string) {
  const res = await fetch(`${API_URL}/favorites/${code}`);

  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    throw new Error("Not found");
  }

  return res.json();
}

export async function searchPokemonByName(name: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
  );

  if (!res.ok) throw new Error("Not found");

  return res.json();
}

/* Backend */

export async function getPokemonById(id: number) {
  const res = await fetch(`${POKEAPI}/pokemon/${id}`);
  if (!res.ok) throw new Error("Pokemon fetch failed");
  return res.json();
}

export async function getPokemonByName(name: string) {
  const res = await fetch(`${POKEAPI}/pokemon/${name}`);
  if (!res.ok) throw new Error("Pokemon fetch failed");
  return res.json();
}

export async function getSpeciesByName(name: string) {
  const res = await fetch(`${POKEAPI}/pokemon-species/${name}`);
  if (!res.ok) throw new Error("Species fetch failed");
  return res.json();
}
