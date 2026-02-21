import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Kategori Talent", href: "#kategori" },
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Pricing", href: "#pricing" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const sticky = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        sticky
          ? "bg-background/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">K</span>
          </div>
          <span className={`font-bold text-lg ${sticky ? "text-foreground" : "text-primary-foreground"}`}>
            KerjaTim<span className="text-primary">.id</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.slice(0, 5).map((item) => {
            if (item.href === "/") {
              return (
                <Link
                  key={item.label}
                  to="/"
                  onClick={(e) => {
                    if (isHome) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    sticky ? "text-muted-foreground" : "text-primary-foreground/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }
            return item.href.startsWith("#") ? (
              <a
                key={item.label}
                href={`/${item.href}`}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  sticky ? "text-muted-foreground" : "text-primary-foreground/80"
                }`}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  sticky ? "text-muted-foreground" : "text-primary-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* RIGHT BUTTON */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* ✅ MASUK → LOGIN */}
          <Link to="/login">
            <Button variant="ghost" size="sm" className={sticky ? "text-foreground" : "text-primary-foreground"}>
              Masuk
            </Button>
          </Link>

          {/* ✅ HIRE TALENT → REGISTER CLIENT */}
          <Link to="/register?role=client">
            <Button size="sm" className="gradient-primary shadow-button">
              Hire Talent
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 ${sticky ? "text-foreground" : "text-primary-foreground"}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href === "/" ? "/" : item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                {item.label}
              </Link>
            ))}

            <div className="flex gap-3 pt-3 border-t border-border">
              
              {/* MOBILE MASUK */}
              <Link to="/login" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Masuk
                </Button>
              </Link>

              {/* MOBILE HIRE */}
              <Link to="/register?role=client" className="flex-1">
                <Button size="sm" className="w-full gradient-primary">
                  Hire Talent
                </Button>
              </Link>

            </div>
          </div>
        </div>
      )}
    </nav>
  );
}