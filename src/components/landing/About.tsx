import { Users, Target, Award, Globe } from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: Users,
      title: "People First",
      desc: "Kami percaya bahwa setiap talent memiliki potensi luar biasa yang perlu disalurkan.",
    },
    {
      icon: Target,
      title: "Kualitas Tanpa Kompromi",
      desc: "Setiap talent melalui proses screening ketat untuk memastikan standar tertinggi.",
    },
    {
      icon: Award,
      title: "Transparansi",
      desc: "Sistem yang terbuka dan jelas, tanpa biaya tersembunyi.",
    },
    {
      icon: Globe,
      title: "Akses Global",
      desc: "Menghubungkan talent terbaik Indonesia dengan perusahaan di seluruh dunia.",
    },
  ];

  return (
    <section id="tentang" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            TENTANG KAMI
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            Membangun Masa Depan Kerja <span className="text-primary">Remote</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            KerjaTim.id adalah platform outsourcing tenaga kerja remote terdepan di Indonesia.
            Kami menghubungkan perusahaan dengan talent berkualitas tanpa kerumitan proses
            rekrutmen tradisional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {values.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
