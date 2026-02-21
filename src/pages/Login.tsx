import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("client"); // default

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // simulasi login sukses
    if (role === "client") {
      navigate("/dashboard/client");
    } else {
      navigate("/dashboard/talent");
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
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded bg-[#1F2937]"
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
      </form>
    </div>
  );
}