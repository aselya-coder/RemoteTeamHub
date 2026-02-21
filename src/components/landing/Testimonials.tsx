import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSupabase } from "@/lib/supabase";

export function Testimonials() {
  const supabase = getSupabase();
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials_public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("nama, jabatan, isi_testimoni, rating").order("nama");
      if (error) throw error;
      return data || [];
    },
  });
  const [current, setCurrent] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const currentTestimonial = testimonials[current];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Testimoni
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Dipercaya <span className="text-gradient">Perusahaan Terbaik</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-2xl border border-border bg-card p-8 md:p-10 shadow-card">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < (currentTestimonial.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-border"
                  }`}
                />
              ))}
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6 italic">
              "{currentTestimonial.isi_testimoni}"
            </p>

            <div>
              <p className="font-semibold text-foreground">{currentTestimonial.nama}</p>
              <p className="text-sm text-muted-foreground">{currentTestimonial.jabatan}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-primary w-6" : "bg-border"
                    }`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
