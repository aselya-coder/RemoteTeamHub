import { PageLayout } from "@/components/layout/PageLayout";
import { FileText, Calendar } from "lucide-react";
import { useAdminStore } from "@/admin/store/useAdminStore";

export default function Blog() {
  const { state } = useAdminStore();
  const blogs = state.blogs;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Blog</p>
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Insight & Tips</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {blogs.map((post) => (
            <div key={post.id} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
              <div className="h-48 gradient-hero flex items-center justify-center">
                {post.thumbnail ? (
                  <img src={post.thumbnail} alt={post.judul} className="w-full h-full object-cover" />
                ) : (
                  <FileText className="w-12 h-12 text-primary/40" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {post.category && (
                    <span className="text-xs font-medium text-primary bg-primary/10 rounded-full px-3 py-1">{post.category}</span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" /> {post.tanggal}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.judul}</h3>
                <p className="text-sm text-muted-foreground">{post.konten}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
