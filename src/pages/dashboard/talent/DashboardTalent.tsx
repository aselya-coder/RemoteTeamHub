import { Link, useLocation } from "react-router-dom";

export default function DashboardTalent() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard/talent" },
    { name: "Profil", path: "/dashboard/talent/profile" },
    { name: "Portfolio", path: "/dashboard/talent/portfolio" },
    { name: "Kontrak", path: "/dashboard/talent/kontrak" },
    { name: "Penghasilan", path: "/dashboard/talent/penghasilan" },
  ];

  return (
    <div className="min-h-screen flex bg-[#0F172A] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Talent Panel</h2>

        <ul className="space-y-3 text-gray-300">
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`block p-2 rounded-lg transition ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-500/20"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard Talent</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1F2937] p-6 rounded-xl">
            <p className="text-gray-400">Project Aktif</p>
            <h2 className="text-2xl font-bold">3</h2>
          </div>

          <div className="bg-[#1F2937] p-6 rounded-xl">
            <p className="text-gray-400">Penghasilan Bulan Ini</p>
            <h2 className="text-2xl font-bold">Rp 8.500.000</h2>
          </div>

          <div className="bg-[#1F2937] p-6 rounded-xl">
            <p className="text-gray-400">Rating</p>
            <h2 className="text-2xl font-bold">4.8 ⭐</h2>
          </div>
        </div>
      </main>
    </div>
  );
}