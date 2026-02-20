import { Link, useNavigate } from "react-router-dom";
import { LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    navigate("/admin/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b border-border bg-card z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <Link to="/admin/dashboard" className="text-xl font-bold text-primary">
            RemoteTeamHub Admin
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Website
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
