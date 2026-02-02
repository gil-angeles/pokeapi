import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function DashboardLayout() {
  return (
    <div className="h-screen flex bg-pokedex-white font-sans overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div id="dashboard-scroll" className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
