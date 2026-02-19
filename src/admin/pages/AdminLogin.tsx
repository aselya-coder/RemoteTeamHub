import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/admin/dashboard";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validEmail = /\S+@\S+\.\S+/.test(email);
    if (validEmail && password.length >= 6) {
      localStorage.setItem("admin_auth", "true");
      navigate(from, { replace: true });
    } else {
      setError("Email atau password tidak valid");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={onSubmit} className="w-full max-w-sm border border-border rounded-xl p-6 space-y-4">
        <h1 className="text-xl font-bold">Admin Login</h1>
        <div className="space-y-2">
          <label className="text-sm">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@domain.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Password</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full">Masuk</Button>
      </form>
    </div>
  );
}
