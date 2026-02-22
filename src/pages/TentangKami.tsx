import { PageLayout } from "@/components/layout/PageLayout";
import { Users, Target, Award, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { cmsPages } from "@/lib/cms";

const values = [
  { icon: Users, title: "People First", desc: "Kami percaya bahwa setiap talent memiliki potensi luar biasa yang perlu disalurkan." },
  { icon: Target, title: "Kualitas Tanpa Kompromi", desc: "Setiap talent melalui proses screening ketat untuk memastikan standar tertinggi." },
  { icon: Award, title: "Transparansi", desc: "Sistem yang terbuka dan jelas, tanpa biaya tersembunyi." },
  { icon: Globe, title: "Akses Global", desc: "Menghubungkan talent terbaik Indonesia dengan perusahaan di seluruh dunia." },
];

export default function TentangKami() {
  const [desc, setDesc] = useState<string>("");
  useEffect(() => {
    const pages = cmsPages.getAll();
    setDesc(pages.tentang.description);
  }, []);
  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Tentang Kami</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            Membangun Masa Depan <span className="text-gradient">Kerja Remote</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {desc || "KerjaTim.id adalah platform outsourcing tenaga kerja remote terdepan di Indonesia. Kami menghubungkan perusahaan dengan talent berkualitas tanpa kerumitan proses rekrutmen tradisional."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                <v.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
