import { PageLayout } from "@/components/layout/PageLayout";
import { useAdminStore } from "@/admin/store/useAdminStore";

export default function TentangKami() {
  const { state } = useAdminStore();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Tentang Kami</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">{state.about.judul}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{state.about.deskripsi}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-2">Visi</h3>
            <p className="text-sm text-muted-foreground">{state.about.visi}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-2">Misi</h3>
            <p className="text-sm text-muted-foreground">{state.about.misi}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
