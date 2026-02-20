import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Tentang Kami", href: "/#tentang" },
  { label: "Kategori Talent", href: "/#kategori" },
  { label: "Cara Kerja", href: "/#cara-kerja" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Admin", href: "/admin" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isScrolled = scrolled || location.pathname !== "/";

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-card border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2" onClick={handleScrollTop}>
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">K</span>
          </div>
          <span className={`font-bold text-lg ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}>
            KerjaTim<span className="text-primary">.id</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={item.href === "/" ? handleScrollTop : undefined}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isScrolled ? "text-muted-foreground" : "text-primary-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className={isScrolled ? "text-foreground" : "text-primary-foreground"}>
            <Link to="/kontak">Masuk</Link>
          </Button>
          <Button asChild size="sm" className="gradient-primary shadow-button">
            <Link to="/cari-talent">Hire Talent</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => {
                  setIsOpen(false);
                  if (item.href === "/") handleScrollTop();
                }}
                className="text-sm font-medium text-muted-foreground hover:text-primary py-2"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-3 border-t border-border">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/kontak" onClick={() => setIsOpen(false)}>Masuk</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 gradient-primary shadow-button">
                <Link to="/cari-talent" onClick={() => setIsOpen(false)}>Hire Talent</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
