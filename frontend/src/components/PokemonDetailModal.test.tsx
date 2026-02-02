import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PokemonDetailModal from "./PokemonDetailModal";

// ---- MOCK API ----
vi.mock("../api/api", () => ({
  getPokemonByName: vi.fn().mockResolvedValue({
    id: 25,
    name: "pikachu",
    types: [],
    stats: [],
    abilities: [],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "pikachu.png",
        },
      },
    },
  }),
  getSpeciesByName: vi.fn().mockResolvedValue({
    flavor_text_entries: [],
  }),
}));

// ---- MOCK FAVORITES ----
const addMock = vi.fn();
const removeMock = vi.fn();
const isFavoriteMock = vi.fn();

vi.mock("./FavoritesContext", () => ({
  useFavorites: () => ({
    addFavorite: addMock,
    removeFavorite: removeMock,
    isFavorite: isFavoriteMock,
  }),
}));

// ---- MOCK CHILD COMPONENTS ----
vi.mock("./PokemonHeroCard", () => ({
  default: () => <div data-testid="hero" />,
}));
vi.mock("./PokemonStatsCard", () => ({
  default: () => <div data-testid="stats" />,
}));
vi.mock("./PokemonAbilitiesCard", () => ({
  default: () => <div data-testid="abilities" />,
}));

function renderWithClient(ui: any) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );
}

describe("PokemonDetailModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows loading state initially", async () => {
    isFavoriteMock.mockReturnValue(false);

    renderWithClient(<PokemonDetailModal name="pikachu" onClose={vi.fn()} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders pokemon data after loading", async () => {
    isFavoriteMock.mockReturnValue(false);

    renderWithClient(<PokemonDetailModal name="pikachu" onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByTestId("hero")).toBeInTheDocument();
      expect(screen.getByTestId("stats")).toBeInTheDocument();
      expect(screen.getByTestId("abilities")).toBeInTheDocument();
    });
  });

  it("calls onClose when clicking backdrop", async () => {
    isFavoriteMock.mockReturnValue(false);
    const closeMock = vi.fn();

    const { container } = renderWithClient(
      <PokemonDetailModal name="pikachu" onClose={closeMock} />,
    );

    await waitFor(() => {
      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    const backdrop = container.firstChild as HTMLElement;

    fireEvent.mouseDown(backdrop);

    expect(closeMock).toHaveBeenCalled();
  });

  it("toggles favorite", async () => {
    isFavoriteMock.mockReturnValue(false);

    renderWithClient(<PokemonDetailModal name="pikachu" onClose={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByTestId("hero")).toBeInTheDocument();
    });

    const heartButton = screen.getAllByRole("button")[0];

    fireEvent.click(heartButton);

    expect(addMock).toHaveBeenCalled();
  });

  it("closes when Escape key is pressed", async () => {
    isFavoriteMock.mockReturnValue(false);
    const closeMock = vi.fn();

    renderWithClient(<PokemonDetailModal name="pikachu" onClose={closeMock} />);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(closeMock).toHaveBeenCalled();
  });
});
