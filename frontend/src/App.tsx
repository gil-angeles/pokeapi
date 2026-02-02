import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import PokemonGrid from "./components/PokemonGrid";
import FavoritesPage from "./pages/FavoritesPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "14px 18px",
          },
        }}
      />

      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<PokemonGrid />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
