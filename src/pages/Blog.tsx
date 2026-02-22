import { PageLayout } from "@/components/layout/PageLayout";
import { FileText, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { cmsBlogs, BlogPost } from "@/lib/cms";

export default function Blog() {
  const [items, setItems] = useState<Array<BlogPost & { category?: string; excerpt?: string }>>([]);
  useEffect(() => {
    const list = cmsBlogs.list();
    setItems(list);
  }, []);
  const posts = items.length
    ? items.map((p) => ({
        title: p.title,
        date: p.date,
        category: p.category || "",
        excerpt: p.excerpt || p.content,
      }))
    : [
        { title: "5 Tips Mengelola Tim Remote dengan Efektif", date: "15 Feb 2026", category: "Tips", excerpt: "Pelajari cara terbaik untuk mengelola tim remote agar tetap produktif dan terhubung." },
        { title: "Tren Outsourcing 2026: Apa yang Harus Diketahui", date: "10 Feb 2026", category: "Insight", excerpt: "Temukan tren terbaru dalam industri outsourcing dan bagaimana mempersiapkan bisnis Anda." },
        { title: "Cara Memilih Talent Remote yang Tepat", date: "5 Feb 2026", category: "Guide", excerpt: "Panduan lengkap untuk memilih talent remote yang sesuai dengan kebutuhan perusahaan." },
      ];
  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Blog</p>
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Insight & Tips</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {posts.map((post) => (
            <div key={post.title} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="h-48 gradient-hero flex items-center justify-center">
                <FileText className="w-12 h-12 text-primary/40" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
