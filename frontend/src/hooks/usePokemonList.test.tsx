import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePokemonList } from "./usePokemonList";

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("usePokemonList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and maps pokemon correctly", async () => {
    const fetchMock = vi.fn();

    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          count: 1,
          next: null,
          previous: null,
          results: [
            {
              name: "bulbasaur",
              url: "https://pokeapi.co/api/v2/pokemon/1/",
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          types: [{ type: { name: "grass" } }],
        }),
      });

    globalThis.fetch = fetchMock as any;

    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const pokemon = result.current.data?.pages?.[0]?.pokemon?.[0];

    expect(pokemon?.id).toBe(1);
    expect(pokemon?.name).toBe("bulbasaur");
    expect(pokemon?.image).toContain("/1.png");
    expect(pokemon?.types).toEqual([{ type: { name: "grass" } }]);
  });

  it("throws error when fetch fails", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
    }) as any;

    const { result } = renderHook(() => usePokemonList(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
