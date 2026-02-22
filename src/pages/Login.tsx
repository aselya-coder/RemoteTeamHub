import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: { pathname?: string } } };
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [role, setRole] = useState("client"); // default
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const q = searchParams.get("role");
    if (q === "client" || q === "talent") {
      setRole(q);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const u = await login(email, password);
      if (u.role !== role) {
        alert(`Akun terdaftar sebagai ${u.role}. Sesuaikan pilihan peran.`);
        return;
      }
      const fromPath = location?.state?.from?.pathname as string | undefined;
      const rolePrefix = `/dashboard/${u.role}`;
      if (fromPath && fromPath.startsWith(rolePrefix)) {
        navigate(fromPath, { replace: true });
      } else {
        navigate(u.role === "client" ? "/dashboard/client" : "/dashboard/talent");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login gagal";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#111827] p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <h1 className="text-2xl font-bold mb-2">Masuk ke KerjaTim.id</h1>
        <p className="text-gray-400 mb-6">Silakan login untuk melanjutkan</p>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded bg-[#1F2937]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-[#1F2937]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-[#1F2937]"
        >
          <option value="client">Login sebagai Client</option>
          <option value="talent">Login sebagai Talent</option>
        </select>

        <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold">
          Masuk
        </button>

        <div className="mt-4 text-center text-sm text-gray-300">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 underline">
            Daftar
          </Link>
        </div>
      </form>
    </div>
  );
}
