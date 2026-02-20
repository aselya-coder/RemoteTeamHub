import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Home, 
  Users, 
  Briefcase, 
  FolderTree, 
  FileText, 
  HelpCircle, 
  Info, 
  DollarSign, 
  Mail, 
  MessageSquare 
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Home, label: "Landing", href: "/admin/landing" },
  { icon: Users, label: "Talents", href: "/admin/talents" },
  { icon: Briefcase, label: "Jobs", href: "/admin/jobs" },
  { icon: FolderTree, label: "Categories", href: "/admin/categories" },
  { icon: FileText, label: "Blogs", href: "/admin/blogs" },
  { icon: HelpCircle, label: "FAQ", href: "/admin/faq" },
  { icon: Info, label: "About", href: "/admin/about" },
  { icon: DollarSign, label: "Pricing", href: "/admin/pricing" },
  { icon: Mail, label: "Contacts", href: "/admin/contacts" },
  { icon: MessageSquare, label: "Testimonials", href: "/admin/testimonials" },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card overflow-y-auto">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
