import { PageLayout } from "@/components/layout/PageLayout";
import { useAdminStore } from "@/admin/store/useAdminStore";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

export default function TentangKami() {
  const { state } = useAdminStore();
  const about = state.about;

  const getIcon = (iconName: string): LucideIcon => {
    const Icon = (LucideIcons as any)[iconName] as LucideIcon;
    return Icon || LucideIcons.Users;
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Tentang Kami</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            {about.judul}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {about.deskripsi}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {about.values.map((v, idx) => {
            const Icon = getIcon(v.icon);
            return (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-3">Visi</h2>
            <p className="text-muted-foreground">{about.visi}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h2 className="text-xl font-semibold mb-3">Misi</h2>
            <p className="text-muted-foreground">{about.misi}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
