import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Header from "./Header";

// ---- MOCK CONTEXTS ----
vi.mock("./FavoritesContext", () => ({
  useFavorites: () => ({
    code: "TEST123",
  }),
}));

const setSearchMock = vi.fn();

vi.mock("./SearchContext", () => ({
  useSearch: () => ({
    search: "",
    setSearch: setSearchMock,
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders current favorites code", () => {
    render(<Header />);
    expect(screen.getByText("TEST123")).toBeInTheDocument();
  });

  it("calls setSearch when typing", () => {
    render(<Header />);
    const input = screen.getByPlaceholderText("Search Pokemon by name...");
    fireEvent.change(input, { target: { value: "pikachu" } });
    expect(setSearchMock).toHaveBeenCalledWith("pikachu");
  });

  it("clears search when Clear button is clicked", () => {
    render(<Header />);
    fireEvent.click(screen.getByText("Clear"));
    expect(setSearchMock).toHaveBeenCalledWith("");
  });

  it("copies code to clipboard when Copy Code is clicked", async () => {
    const writeMock = vi.fn().mockResolvedValue(undefined);

    Object.assign(navigator, {
      clipboard: { writeText: writeMock },
    });

    render(<Header />);

    fireEvent.click(screen.getByText("Copy Code"));

    await waitFor(() => {
      expect(writeMock).toHaveBeenCalledWith("TEST123");
    });
  });
});
