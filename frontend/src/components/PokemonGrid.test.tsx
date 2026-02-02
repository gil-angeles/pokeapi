import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PokemonGrid from "./PokemonGrid";

let searchValue = "";

vi.mock("./SearchContext", () => ({
  useSearch: () => ({
    search: searchValue,
  }),
}));

const mockUsePokemonList = vi.fn();

vi.mock("../hooks/usePokemonList", () => ({
  usePokemonList: () => mockUsePokemonList(),
}));

const getPokemonByNameMock = vi.fn();

vi.mock("../api/api", () => ({
  getPokemonByName: (...args: any[]) => getPokemonByNameMock(...args),
}));

vi.mock("./PokemonCard", () => ({
  default: ({ pokemon }: any) => <div data-testid="card">{pokemon.name}</div>,
}));

vi.mock("./LoadMoreButton", () => ({
  default: ({ onClick }: any) => <button onClick={onClick}>Load More</button>,
}));

function renderWithClient(ui: any) {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
}

describe("PokemonGrid", () => {
  beforeEach(() => {
    searchValue = "";
    vi.clearAllMocks();

    mockUsePokemonList.mockReturnValue({
      data: {
        pages: [
          {
            pokemon: [
              { id: 1, name: "bulbasaur", image: "b.png" },
              { id: 4, name: "charmander", image: "c.png" },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    getPokemonByNameMock.mockResolvedValue({
      id: 25,
      name: "pikachu",
      types: [],
      sprites: {
        other: {
          "official-artwork": {
            front_default: "pikachu.png",
          },
        },
      },
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("renders pokemon list", () => {
    renderWithClient(<PokemonGrid />);
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  it("renders search result when searching", async () => {
    searchValue = "pikachu";
    renderWithClient(<PokemonGrid />);
    expect(await screen.findByText("pikachu")).toBeInTheDocument();
  });

  it("shows error when search fails", async () => {
    searchValue = "unknown";
    getPokemonByNameMock.mockRejectedValueOnce(new Error("Not found"));
    renderWithClient(<PokemonGrid />);
    expect(await screen.findByText(/does not exist/i)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    mockUsePokemonList.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isError: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    renderWithClient(<PokemonGrid />);
    expect(screen.getByText("Loading Pokémon...")).toBeInTheDocument();
  });
});
