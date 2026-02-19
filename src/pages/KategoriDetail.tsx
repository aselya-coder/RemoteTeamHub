import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "react-router-dom";
import { buildWhatsAppLink } from "@/lib/utils";
import { useAdminStore } from "@/admin/store/useAdminStore";

export default function KategoriDetail() {
  const { slug } = useParams();
  const { state } = useAdminStore();
  const data = state.categories.find((c) => c.slug === slug);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {data ? (
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Kategori</p>
            <h1 className="text-4xl font-extrabold text-foreground mb-4">{data.nama}</h1>
            <div className="mb-4">
              <span className="text-xs font-medium text-muted-foreground bg-secondary rounded-full px-3 py-1">Mulai {data.harga}/bln</span>
            </div>
            <p className="text-lg text-muted-foreground mb-8">{data.deskripsi}</p>

            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button asChild className="gradient-primary shadow-button">
                <a
                  href={buildWhatsAppLink(`Halo KerjaTim.id, saya ingin hire kategori ${data.nama}. Harga mulai ${data.harga}/bln.`) }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hire Talent
                </a>
              </Button>
              <Button asChild variant="outline">
                <a
                  href={buildWhatsAppLink(`Halo KerjaTim.id, saya ingin konsultasi untuk kategori ${data.nama}.`) }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Konsultasi
                </a>
              </Button>
              <Button asChild variant="outline">
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
