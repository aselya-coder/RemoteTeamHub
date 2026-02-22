import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/lib/admin-auth";

export default function AdminLogin() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: { pathname?: string } } };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const to = location?.state?.from?.pathname || "/admin";
      navigate(to, { replace: true });
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Login admin gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
      <form onSubmit={onSubmit} className="bg-[#111827] p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
        <p className="text-gray-400 mb-6">Masuk sebagai administrator</p>
        <input className="w-full mb-4 p-3 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="w-full mb-6 p-3 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold">Masuk</button>
        <p className="text-xs text-gray-400 mt-3">Demo: admin@demo.id / admin123</p>
      </form>
    </div>
  );
}
