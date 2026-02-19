import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useAdminStore } from "@/admin/store/useAdminStore";

export function Testimonials() {
  const { state } = useAdminStore();
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? Math.max(0, state.testimonials.length - 1) : c - 1));
  const next = () => setCurrent((c) => (c === Math.max(0, state.testimonials.length - 1) ? 0 : c + 1));

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
            {state.testimonials.length > 0 ? (
              <>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (state.testimonials[current].rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground text-lg leading-relaxed mb-6 italic">
                  "{state.testimonials[current].isi_testimoni}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{state.testimonials[current].nama}</p>
                  <p className="text-sm text-muted-foreground">{state.testimonials[current].jabatan}</p>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">Belum ada testimoni</p>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {state.testimonials.map((_, i) => (
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
