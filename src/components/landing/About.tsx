import { Users, Target, Award, Globe } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSupabase } from "@/lib/supabase";

export function AboutSection() {
  const supabase = getSupabase();
  const { data: about } = useQuery({
    queryKey: ["about_public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about").select("judul, deskripsi").limit(1).maybeSingle();
      if (error) throw error;
      return data || { judul: "Membangun Masa Depan Kerja Remote", deskripsi: "KerjaTim.id adalah platform outsourcing tenaga kerja remote..." };
    },
  });
  const { data: values } = useQuery({
    queryKey: ["about_values_public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("about_values").select("icon, title, description").order("position");
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <section id="tentang" className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            TENTANG KAMI
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">{about?.judul || "Tentang Kami"}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{about?.deskripsi}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {(values || []).map((item: any, idx: number) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
                {/* Ikon by name */}
                {item.icon === "Users" && <Users className="w-6 h-6 text-primary-foreground" />}
                {item.icon === "Target" && <Target className="w-6 h-6 text-primary-foreground" />}
                {item.icon === "Award" && <Award className="w-6 h-6 text-primary-foreground" />}
                {item.icon === "Globe" && <Globe className="w-6 h-6 text-primary-foreground" />}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
