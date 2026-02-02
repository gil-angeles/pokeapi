import { Compass, Heart } from "lucide-react";
import SidebarNavItem from "./SidebarNavItem";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDiscover = location.pathname === "/";
  const isFavorites = location.pathname === "/favorites";

  return (
    <aside className="relative w-80 bg-pokedex-red flex flex-col p-8 gap-8">
      <div className="absolute top-0 right-0 h-full w-1 bg-black" />

      <h1 className="text-3xl font-extrabold uppercase italic tracking-tight text-white">
        Pokedex
      </h1>

      <nav className="flex flex-col gap-3">
        <SidebarNavItem
          label="Discover"
          Icon={Compass}
          active={isDiscover}
          onClick={() => navigate("/")}
        />

        <SidebarNavItem
          label="Favorites"
          Icon={Heart}
          active={isFavorites}
          onClick={() => navigate("/favorites")}
        />
      </nav>
    </aside>
  );
}
