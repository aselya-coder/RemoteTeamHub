import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/landing", label: "Landing" },
  { to: "/admin/talents", label: "Talents" },
  { to: "/admin/jobs", label: "Jobs" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/blogs", label: "Blogs" },
  { to: "/admin/faq", label: "FAQ" },
  { to: "/admin/about", label: "About" },
  { to: "/admin/pricing", label: "Pricing" },
  { to: "/admin/contacts", label: "Contacts" },
  { to: "/admin/testimonials", label: "Testimonials" },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground grid grid-cols-[240px_1fr]">
      <aside className="border-r border-border p-4 space-y-4">
        <Link to="/" className="font-bold text-lg">KerjaTim<span className="text-primary">.id</span></Link>
        <nav className="flex flex-col gap-2">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`px-3 py-2 rounded-md ${pathname === l.to ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{l.label}</Link>
          ))}
        </nav>
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem("admin_auth");
            navigate("/admin");
          }}
        >Logout</Button>
      </aside>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

