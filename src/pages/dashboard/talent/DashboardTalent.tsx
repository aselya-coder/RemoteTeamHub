import { Link, Outlet } from "react-router-dom";

export default function DashboardTalent() {
  return (
    <div className="min-h-screen flex bg-[#0F172A] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111827] p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Talent Panel</h2>

        <nav className="space-y-2 text-gray-300">
          <Link to="/dashboard/talent" className="block hover:text-white">Dashboard</Link>
          <Link to="/dashboard/talent/profile" className="block hover:text-white">Profil</Link>
          <Link to="/dashboard/talent/portfolio" className="block hover:text-white">Portfolio</Link>
          <Link to="/dashboard/talent/kontrak" className="block hover:text-white">Kontrak</Link>
          <Link to="/dashboard/talent/penghasilan" className="block hover:text-white">Penghasilan</Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}
