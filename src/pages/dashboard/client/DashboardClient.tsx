import { Link, useLocation } from "react-router-dom";

export default function DashboardClient() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard/client" },
    { name: "Cari Talent", path: "/dashboard/client/talent" },
    { name: "Kontrak Aktif", path: "/dashboard/client/kontrak" },
    { name: "Invoice", path: "/dashboard/client/invoice" },
    { name: "Pengaturan", path: "/dashboard/client/settings" },
  ];

  return (
    <div className="min-h-screen flex bg-[#0F172A] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Client Panel</h2>

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
        <h1 className="text-2xl font-bold mb-6">Dashboard Client</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1F2937] p-6 rounded-xl">
            <p className="text-gray-400">Tenaga Kerja Aktif</p>
            <h2 className="text-2xl font-bold">12</h2>
          </div>

          <div className="bg-[#1F2937] p-6 rounded-xl">
            <p className="text-gray-400">Tagihan Bulan Ini</p>
            <h2 className="text-2xl font-bold">Rp 25.000.000</h2>
          </div>

          <div className="bg-[#1F2937] p-6 rounded-xl">
            <p className="text-gray-400">Kontrak Aktif</p>
            <h2 className="text-2xl font-bold">5</h2>
          </div>
        </div>
      </main>
    </div>
  );
}