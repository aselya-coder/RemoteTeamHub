import { Database, Code, Palette, PenTool, Headphones, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { icon: Database, title: "Data Entry", salary: "Rp 3.5 Jt", desc: "Pengelolaan data akurat & cepat" },
  { icon: Code, title: "Programmer", salary: "Rp 8 Jt", desc: "Full-stack, mobile, dan backend" },
  { icon: Palette, title: "UI/UX Designer", salary: "Rp 6 Jt", desc: "Desain interface & experience" },
  { icon: PenTool, title: "Graphic Designer", salary: "Rp 4.5 Jt", desc: "Branding, social media & print" },
  { icon: Headphones, title: "Customer Service", salary: "Rp 3.5 Jt", desc: "Layanan pelanggan profesional" },
  { icon: TrendingUp, title: "Digital Marketing", salary: "Rp 5 Jt", desc: "SEO, ads, & content strategy" },
];

export function TalentCategories() {
  return (
    <section id="kategori" className="py-20 bg-soft-gray">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Kategori Talent
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Temukan Talent <span className="text-gradient">Sesuai Kebutuhan</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:gradient-primary">
                  <cat.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-secondary rounded-full px-3 py-1">
                  Mulai {cat.salary}/bln
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{cat.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
              <Button variant="outline" size="sm" className="w-full group-hover:gradient-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all">
                Lihat Detail
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
