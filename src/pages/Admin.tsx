import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminLayout } from "@/admin/layout/AdminLayout";
import { Dashboard } from "@/admin/pages/Dashboard";
import { Landing } from "@/admin/pages/Landing";
import { Talents } from "@/admin/pages/Talents";
import { Jobs } from "@/admin/pages/Jobs";
import { Categories } from "@/admin/pages/Categories";
import { Blogs } from "@/admin/pages/Blogs";
import { FAQ } from "@/admin/pages/FAQ";
import { About } from "@/admin/pages/About";
import { PricingPage } from "@/admin/pages/Pricing";
import { Contacts } from "@/admin/pages/Contacts";
import { Testimonials } from "@/admin/pages/Testimonials";
import { getSupabase } from "@/lib/supabase";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const supabase = getSupabase();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    async function checkAuth() {
      // Check Supabase session first
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setStatus("ok");
        return;
      }

      // Fallback to local auth
      const auth = localStorage.getItem("admin_auth");
      if (!auth) {
        navigate("/admin/login");
        return;
      }
      
      try {
        const authData = JSON.parse(auth);
        if (authData.method === "supabase") {
          // Check if session still valid
          const { data: { session: newSession } } = await supabase.auth.getSession();
          if (newSession?.user) {
            setStatus("ok");
          } else {
            localStorage.removeItem("admin_auth");
            navigate("/admin/login");
          }
        } else if (authData.email === "admin@remote.com" && authData.password === "admin123") {
          setStatus("ok");
        } else {
          setStatus("denied");
        }
      } catch {
        setStatus("denied");
      }
    }
    
    checkAuth();
  }, [navigate, supabase]);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center">Memeriksa akses...</div>
    );
  }

  if (status === "denied") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-xl font-semibold">Akses ditolak</div>
          <div className="text-muted-foreground">Akun ini bukan admin.</div>
          <button
            onClick={() => {
              localStorage.removeItem("admin_auth");
              navigate("/admin/login");
            }}
            className="text-primary underline"
          >
            Ke halaman login
          </button>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    const path = location.pathname;
    if (path === "/admin/dashboard" || path === "/admin") return <Dashboard />;
    if (path === "/admin/landing") return <Landing />;
    if (path === "/admin/talents") return <Talents />;
    if (path === "/admin/jobs") return <Jobs />;
    if (path === "/admin/categories") return <Categories />;
    if (path === "/admin/blogs") return <Blogs />;
    if (path === "/admin/faq") return <FAQ />;
    if (path === "/admin/about") return <About />;
    if (path === "/admin/pricing") return <PricingPage />;
    if (path === "/admin/contacts") return <Contacts />;
    if (path === "/admin/testimonials") return <Testimonials />;
    return <Dashboard />;
  };

  return <AdminLayout>{renderPage()}</AdminLayout>;
}

