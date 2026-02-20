import { Users, Target, Award, Globe, LucideIcon } from "lucide-react";
import { useAdminStore } from "@/admin/store/useAdminStore";
import * as LucideIcons from "lucide-react";

export function AboutSection() {
  const { state } = useAdminStore();
  const about = state.about;

  const getIcon = (iconName: string): LucideIcon => {
    const Icon = (LucideIcons as any)[iconName] as LucideIcon;
    return Icon || Users;
  };

  return (
    <section id="tentang" className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Tentang Kami</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6">
            {about.judul}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {about.deskripsi}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {about.values.map((v, idx) => {
            const Icon = getIcon(v.icon);
            return (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
