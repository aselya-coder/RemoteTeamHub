import React, { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "./supabase";

type Role = "client" | "talent";
type Account = { email: string; password: string; role: Role; name?: string };
type User = { email: string; role: Role; name?: string };

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (account: Account) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ACCOUNTS_KEY = "kt_accounts";
const USER_KEY = "kt_user";
const AUTH_MODE = (import.meta as ImportMeta).env?.VITE_AUTH_BACKEND || "local";

const readAccounts = (): Account[] => {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeAccounts = (accounts: Account[]) => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (AUTH_MODE === "supabase" && supabase) {
      void (async () => {
        const { data } = await supabase.auth.getUser();
        const u = data.user;
        if (u) {
          const role = (u.user_metadata?.role as Role | undefined) || "client";
          const name = (u.user_metadata?.name as string | undefined) || undefined;
          if (role === "client" || role === "talent") {
            const mapped: User = { email: u.email || "", role, name };
            setUser(mapped);
          }
        }
      })();
      const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const u = session?.user;
        if (u) {
          const role = (u.user_metadata?.role as Role | undefined) || "client";
          const name = (u.user_metadata?.name as string | undefined) || undefined;
          if (role === "client" || role === "talent") {
            setUser({ email: u.email || "", role, name });
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      });
      return () => {
        sub.subscription.unsubscribe();
      };
    } else {
      const existing = readAccounts();
      if (existing.length === 0) {
        writeAccounts([
          { name: "Demo Client", email: "client@demo.id", password: "demo123", role: "client" },
          { name: "Demo Talent", email: "talent@demo.id", password: "demo123", role: "talent" },
        ]);
      }

      const raw = localStorage.getItem(USER_KEY);
      if (raw) {
        try {
          setUser(JSON.parse(raw));
        } catch {
          setUser(null);
        }
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    if (AUTH_MODE === "supabase" && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error || !data.user) throw new Error(error?.message || "Email atau password salah");
      const role = (data.user.user_metadata?.role as Role | undefined) || "client";
      const name = (data.user.user_metadata?.name as string | undefined) || undefined;
      if (role !== "client" && role !== "talent") {
        await supabase.auth.signOut();
        throw new Error("Akun tidak memiliki peran yang valid");
      }
      const u: User = { email: data.user.email || "", role, name };
      setUser(u);
      return u;
    } else {
      const accounts = readAccounts();
      const found = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password);
      if (!found) throw new Error("Email atau password salah");
      const u: User = { email: found.email, role: found.role, name: found.name };
      localStorage.setItem(USER_KEY, JSON.stringify(u));
      setUser(u);
      return u;
    }
  };

  const register = async (account: Account) => {
    if (AUTH_MODE === "supabase" && supabase) {
      const { error } = await supabase.auth.signUp({
        email: account.email,
        password: account.password,
        options: {
          data: { role: account.role, name: account.name },
        },
      });
      if (error) throw new Error(error.message);
      return;
    } else {
      const accounts = readAccounts();
      if (accounts.some((a) => a.email.toLowerCase() === account.email.toLowerCase())) {
        throw new Error("Email sudah terdaftar");
      }
      accounts.push(account);
      writeAccounts(accounts);
    }
  };

  const logout = () => {
    if (AUTH_MODE === "supabase" && supabase) {
      void supabase.auth.signOut();
      setUser(null);
    } else {
      localStorage.removeItem(USER_KEY);
      setUser(null);
    }
  };

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export function RequireRole({ role, children }: { role: Role; children: React.ReactElement }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.role !== role) return <Navigate to="/login" replace />;
  return children;
}
