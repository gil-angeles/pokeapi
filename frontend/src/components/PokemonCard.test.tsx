import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import PokemonCard from "./PokemonCard";

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

// ---- MOCK MODAL ----
vi.mock("./PokemonDetailModal", () => ({
  default: ({ name }: any) => <div data-testid="modal">{name}</div>,
}));

const pokemon = {
  id: 25,
  name: "pikachu",
  image: "pikachu.png",
};

describe("PokemonCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders pokemon info", () => {
    isFavoriteMock.mockReturnValue(false);

    render(<PokemonCard pokemon={pokemon} />);

    expect(screen.getByText("#025")).toBeInTheDocument();
    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  it("calls addFavorite when not favorite", () => {
    isFavoriteMock.mockReturnValue(false);

    render(<PokemonCard pokemon={pokemon} />);

    fireEvent.click(screen.getByLabelText("Toggle favorite"));

    expect(addMock).toHaveBeenCalledWith(pokemon);
  });

  it("calls removeFavorite when already favorite", () => {
    isFavoriteMock.mockReturnValue(true);

    render(<PokemonCard pokemon={pokemon} />);

    fireEvent.click(screen.getByLabelText("Toggle favorite"));

    expect(removeMock).toHaveBeenCalledWith(25);
  });

  it("opens modal when card is clicked", () => {
    isFavoriteMock.mockReturnValue(false);

    render(<PokemonCard pokemon={pokemon} />);

    fireEvent.click(screen.getByText("pikachu"));

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});
