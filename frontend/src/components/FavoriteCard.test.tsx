import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FavoriteCard from "./FavoriteCard";

vi.mock("./PokemonDetailModal", () => ({
  default: ({ name, onClose }: any) => (
    <div data-testid="modal">
      <span>{name}</span>
      <button onClick={onClose}>Close</button>
    </div>
  ),
}));

vi.mock("../constants/pokemonTypes", () => ({
  TYPE_COLORS: {
    electric: "bg-yellow-400",
  },
}));

const mockPokemon = {
  id: 25,
  name: "pikachu",
  image: "pikachu.png",
  types: [{ type: { name: "electric" } }],
};

describe("FavoriteCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders pokemon name and id", () => {
    render(<FavoriteCard pokemon={mockPokemon} />);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText("#0025")).toBeInTheDocument();
  });

  it("renders pokemon types", () => {
    render(<FavoriteCard pokemon={mockPokemon} />);
    expect(screen.getByText("electric")).toBeInTheDocument();
  });

  it("opens modal when card is clicked", () => {
    render(<FavoriteCard pokemon={mockPokemon} />);
    fireEvent.click(screen.getByText(/pikachu/i));
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<FavoriteCard pokemon={mockPokemon} />);
    fireEvent.click(screen.getByText(/pikachu/i));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
