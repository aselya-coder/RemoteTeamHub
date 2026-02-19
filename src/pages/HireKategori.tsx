import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { buildWhatsAppLink } from "@/lib/utils";
import { useAdminStore } from "@/admin/store/useAdminStore";

export default function HireKategori() {
  const { slug } = useParams();
  const { state } = useAdminStore();
  const cat = state.categories.find((c) => c.slug === slug);
  const bullets: string[] = cat?.bullets || [];

  return (
    <PageLayout noBottomPadding>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {cat ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Hire</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Hire {cat.nama} Remote</h1>
              <div className="mb-4">
                <span className="text-xs font-medium text-muted-foreground bg-secondary rounded-full px-3 py-1">Mulai {cat.harga}/bln</span>
              </div>
              <p className="text-lg text-muted-foreground">{cat.deskripsi}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {bullets.map((b) => (
                <div key={b} className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <p className="text-sm text-foreground font-medium">{b}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 justify-center mb-16 max-w-2xl mx-auto">
              <Button asChild className="gradient-primary shadow-button px-8 h-12">
                <a
                  href={buildWhatsAppLink(`Halo KerjaTim.id, saya ingin mulai hire kategori ${cat.nama}. Harga mulai ${cat.harga}/bln.`) }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mulai Hire
                </a>
              </Button>
              <Button asChild variant="outline" className="px-8 h-12">
                <a
                  href={buildWhatsAppLink(`Halo KerjaTim.id, saya ingin konsultasi untuk kategori ${cat.nama}.`) }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konsultasi
                </a>
              </Button>
              <Button asChild variant="outline" className="px-8 h-12">
                <Link to="/kategori">Kembali ke Kategori Talent</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Kategori tidak ditemukan</h1>
            <p className="text-muted-foreground mb-6">Silakan kembali dan pilih kategori yang tersedia.</p>
            <Button asChild variant="outline">
              <Link to="/">Kembali ke Beranda</Link>
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
