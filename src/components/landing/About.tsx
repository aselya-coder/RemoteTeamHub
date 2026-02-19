import { Users, Target, Award, Globe } from "lucide-react";
import { useAdminStore } from "@/admin/store/useAdminStore";
const icons = { Users, Target, Award, Globe } as const;

export function AboutSection() {
  const { state } = useAdminStore();
  return (
    <section id="tentang" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Tentang Kami</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6">
            Membangun Masa Depan <span className="text-gradient">Kerja Remote</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            KerjaTim.id adalah platform outsourcing tenaga kerja remote terdepan di Indonesia. Kami menghubungkan perusahaan dengan talent berkualitas tanpa kerumitan proses rekrutmen tradisional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {state.about.values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                {(() => {
                  const Icon = icons[v.icon as keyof typeof icons] || Users;
                  return <Icon className="w-6 h-6 text-primary-foreground" />;
                })()}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
