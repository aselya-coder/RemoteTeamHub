import { Shield, Clock, FileCheck, RefreshCw } from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "Tanpa Biaya Rekrut",
    description: "Tidak ada biaya tersembunyi untuk proses rekrutmen. Anda hanya membayar saat talent mulai bekerja.",
  },
  {
    icon: Clock,
    title: "Siap Kerja & Terscreening",
    description: "Semua talent telah melalui proses screening ketat dan siap bekerja dalam waktu singkat.",
  },
  {
    icon: FileCheck,
    title: "Kontrak Fleksibel",
    description: "Pilih durasi kontrak sesuai kebutuhan. Bulanan, project-based, atau jangka panjang.",
  },
  {
    icon: RefreshCw,
    title: "Ganti Talent Gratis",
    description: "Jika talent tidak cocok, kami akan mengganti dengan kandidat baru tanpa biaya tambahan.",
  },
];

export function Benefits() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Kenapa KerjaTim.id?
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Solusi Outsourcing yang{" "}
            <span className="text-gradient">Lebih Cerdas</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <b.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
