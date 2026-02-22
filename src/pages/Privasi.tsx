import { PageLayout } from "@/components/layout/PageLayout";
import { useEffect, useState } from "react";
import { cmsPages } from "@/lib/cms";

export default function Privasi() {
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    const pages = cmsPages.getAll();
    setContent(pages.privasi.content);
  }, []);
  const paragraphs = content ? content.split(/\n\n+/) : [];
  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-sm">
          <h1 className="text-4xl font-extrabold text-foreground mb-8">Kebijakan Privasi</h1>
          <div className="space-y-6 text-muted-foreground">
            {paragraphs.length
              ? paragraphs.map((p, i) => <p key={i}>{p}</p>)
              : (
                <>
                  <p>Terakhir diperbarui: 1 Februari 2026</p>
                  <h2 className="text-xl font-semibold text-foreground">1. Informasi yang Kami Kumpulkan</h2>
                  <p>Kami mengumpulkan informasi yang Anda berikan secara langsung, termasuk nama, email, nomor telepon, dan informasi profesional saat mendaftar di platform kami.</p>
                  <h2 className="text-xl font-semibold text-foreground">2. Penggunaan Informasi</h2>
                  <p>Informasi yang dikumpulkan digunakan untuk menyediakan dan meningkatkan layanan kami, mencocokkan talent dengan kebutuhan klien, dan berkomunikasi dengan Anda.</p>
                  <h2 className="text-xl font-semibold text-foreground">3. Keamanan Data</h2>
                  <p>Kami menerapkan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda dari akses tidak sah, perubahan, pengungkapan, atau penghancuran.</p>
                  <h2 className="text-xl font-semibold text-foreground">4. Hubungi Kami</h2>
                  <p>Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, hubungi kami di privacy@kerjatim.id.</p>
                </>
              )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
