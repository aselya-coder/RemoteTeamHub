import { Link } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "Cari Talent", href: "/cari-talent" },
    { label: "Cara Kerja", href: "/cara-kerja" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "/tentang" },
    { label: "Kontak", href: "/kontak" },
    { label: "FAQ", href: "/faq" },
    { label: "Karir", href: "/karir" },
  ],
  Legal: [
    { label: "Kebijakan Privasi", href: "/privacy" },
    { label: "Syarat & Ketentuan", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground/80">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <Link 
              to="/" 
              className="flex items-center gap-2 mb-4"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">K</span>
              </div>
              <span className="font-bold text-lg text-primary-foreground">
                KerjaTim<span className="text-primary">.id</span>
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Sewa Tim Remote Siap Kerja Tanpa Ribet Rekrut. Platform outsourcing #1 di Indonesia.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-primary-foreground mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/60 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/40">
            © 2026 KerjaTim.id. Semua hak dilindungi.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-primary-foreground/40 hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="text-sm text-primary-foreground/40 hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="text-sm text-primary-foreground/40 hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
