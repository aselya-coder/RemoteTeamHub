import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/lib/auth";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");

  useEffect(() => {
    const q = searchParams.get("role");
    if (q === "client" || q === "talent") {
      setRole(q);
    }
  }, [searchParams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password, role: role as "client" | "talent" });
      alert("Registrasi berhasil. Silakan login.");
      navigate("/login");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registrasi gagal";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
      <form onSubmit={onSubmit} className="bg-[#111827] p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold mb-2">Daftar Akun</h1>
        <p className="text-gray-400 mb-6">Buat akun sebagai Client atau Talent</p>

        <input type="text" placeholder="Nama Lengkap" className="w-full mb-4 p-3 rounded bg-[#1F2937]" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="w-full mb-4 p-3 rounded bg-[#1F2937]" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-4 p-3 rounded bg-[#1F2937]" value={password} onChange={(e) => setPassword(e.target.value)} />

        <select className="w-full mb-4 p-3 rounded bg-[#1F2937]" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="client">Daftar sebagai Client</option>
          <option value="talent">Daftar sebagai Talent</option>
        </select>

        <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold" type="submit">Daftar</button>
      </form>
    </div>
  );
}
