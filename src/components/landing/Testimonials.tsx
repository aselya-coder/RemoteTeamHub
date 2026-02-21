import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Andi Wijaya",
    role: "CEO, TechNusa",
    text: "KerjaTim.id membantu kami menemukan 5 programmer berkualitas dalam waktu satu minggu. Prosesnya sangat cepat dan profesional.",
    rating: 5,
  },
  {
    name: "Sari Indah",
    role: "HR Manager, StartupXYZ",
    text: "Kontrak yang fleksibel dan talent yang sudah terscreening membuat kami menghemat waktu rekrutmen hingga 80%.",
    rating: 5,
  },
  {
    name: "Budi Santoso",
    role: "CTO, DataPro Indonesia",
    text: "Kualitas talent di KerjaTim.id sangat baik. Tim data entry kami sekarang 3x lebih produktif dengan biaya yang lebih efisien.",
    rating: 5,
  },
  {
    name: "Maya Putri",
    role: "COO, DesainKu",
    text: "Kami sudah mencoba banyak platform, tapi KerjaTim.id yang paling responsif dan memberikan kandidat yang paling sesuai.",
    rating: 4,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

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
                    i < testimonials[current].rating ? "text-yellow-400 fill-yellow-400" : "text-border"
                  }`}
                />
              ))}
            </div>

            <p className="text-foreground text-lg leading-relaxed mb-6 italic">
              "{testimonials[current].text}"
            </p>

            <div>
              <p className="font-semibold text-foreground">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
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
