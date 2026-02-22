import { PageLayout } from "@/components/layout/PageLayout";
import { useEffect, useState } from "react";
import { cmsPages } from "@/lib/cms";

export default function SyaratKetentuan() {
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    const pages = cmsPages.getAll();
    setContent(pages.syarat.content);
  }, []);
  const paragraphs = content ? content.split(/\n\n+/) : [];
  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-sm">
          <h1 className="text-4xl font-extrabold text-foreground mb-8">Syarat & Ketentuan</h1>
          <div className="space-y-6 text-muted-foreground">
            {paragraphs.length
              ? paragraphs.map((p, i) => <p key={i}>{p}</p>)
              : (
                <>
                  <p>Terakhir diperbarui: 1 Februari 2026</p>
                  <h2 className="text-xl font-semibold text-foreground">1. Ketentuan Umum</h2>
                  <p>Dengan menggunakan layanan KerjaTim.id, Anda setuju untuk terikat dengan syarat dan ketentuan ini. Platform kami menyediakan layanan pencocokan talent remote dengan kebutuhan perusahaan.</p>
                  <h2 className="text-xl font-semibold text-foreground">2. Layanan</h2>
                  <p>KerjaTim.id menyediakan layanan outsourcing tenaga kerja remote termasuk rekrutmen, screening, pengelolaan kontrak, dan pembayaran.</p>
                  <h2 className="text-xl font-semibold text-foreground">3. Pembayaran</h2>
                  <p>Pembayaran dilakukan secara bulanan sesuai dengan paket yang dipilih. Keterlambatan pembayaran dapat mengakibatkan penangguhan layanan.</p>
                  <h2 className="text-xl font-semibold text-foreground">4. Kerahasiaan</h2>
                  <p>Kedua belah pihak setuju untuk menjaga kerahasiaan informasi bisnis dan data sensitif yang dibagikan selama kerjasama.</p>
                </>
              )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
