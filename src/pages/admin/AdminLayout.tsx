import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/lib/admin-auth";

export default function AdminLayout() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-[#0F172A] text-white">
      <aside className="w-64 bg-[#111827] p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="space-y-2 text-gray-300">
          <Link to="/admin" className="block hover:text-white">Dashboard</Link>
          <Link to="/admin/index" className="block hover:text-white">Index</Link>
          <Link to="/admin/tentang" className="block hover:text-white">Tentang Kami</Link>
          <Link to="/admin/blog" className="block hover:text-white">Blog</Link>
          <Link to="/admin/faq" className="block hover:text-white">FAQ</Link>
          <Link to="/admin/kontak" className="block hover:text-white">Kontak</Link>
          <Link to="/admin/privasi" className="block hover:text-white">Privasi</Link>
          <Link to="/admin/syarat" className="block hover:text-white">Syarat Ketentuan</Link>
        </nav>
        <button
          onClick={() => {
            logout();
            navigate("/admin/login");
          }}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg"
        >
          Keluar
        </button>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

