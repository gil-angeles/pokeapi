import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { FavoritesProvider, useFavorites } from "./FavoritesContext";

// ---- MOCKS ----
vi.mock("../api/api", () => ({
  loadFavorites: vi.fn().mockResolvedValue({ pokemons: [] }),
  saveFavorites: vi.fn().mockResolvedValue({}),
}));

vi.mock("../utils/generateCode", () => ({
  generateCode: () => "TESTCODE",
}));

vi.mock("react-hot-toast", () => ({
  default: Object.assign(vi.fn(), { success: vi.fn() }),
}));

// ---- TEST COMPONENT ----
function TestComponent() {
  const { favorites, addFavorite, removeFavorite, isFavorite, regenerateCode } =
    useFavorites();

  return (
    <div>
      <span data-testid="count">{favorites.length}</span>
      <button
        onClick={() => addFavorite({ id: 1, name: "pikachu", image: "" })}
      >
        Add
      </button>
      <button onClick={() => removeFavorite(1)}>Remove</button>
      <button onClick={regenerateCode}>Regenerate</button>
      <span data-testid="isFav">{isFavorite(1) ? "yes" : "no"}</span>
    </div>
  );
}

// ---- TESTS ----
describe("FavoritesContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("adds a pokemon to favorites", async () => {
    const user = userEvent.setup();

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("0"),
    );

    await user.click(screen.getByText("Add"));

    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("1"),
    );

    expect(screen.getByTestId("isFav")).toHaveTextContent("yes");
  });

  it("removes a pokemon from favorites", async () => {
    const user = userEvent.setup();

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("0"),
    );

    await user.click(screen.getByText("Add"));

    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("1"),
    );

    await user.click(screen.getByText("Remove"));

    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("0"),
    );
  });

  it("regenerates code and resets favorites", async () => {
    const user = userEvent.setup();

    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("0"),
    );

    await user.click(screen.getByText("Add"));

    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("1"),
    );

    await user.click(screen.getByText("Regenerate"));

    await waitFor(() =>
      expect(screen.getByTestId("count")).toHaveTextContent("0"),
    );
  });
});
