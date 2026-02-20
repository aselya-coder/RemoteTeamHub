import { useAdminStore } from "@/admin/store/useAdminStore";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";

export function HowItWorks() {
  const { state } = useAdminStore();
  const steps = state.steps;

  const getIcon = (iconName: string): LucideIcon => {
    const Icon = (LucideIcons as any)[iconName] as LucideIcon;
    return Icon || LucideIcons.Circle;
  };

  return (
    <section id="cara-kerja" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Cara Kerja
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Proses <span className="text-gradient">Mudah & Cepat</span>
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {steps.map((step, i) => {
            const Icon = getIcon(step.icon);
            return (
              <div
                key={step.title}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Number circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-button md:absolute md:left-1/2 md:-translate-x-1/2">
                  <span className="text-primary-foreground font-bold text-sm">{i + 1}</span>
                </div>

                {/* Content card */}
                <div className={`flex-1 rounded-2xl border border-border bg-card p-5 shadow-card md:w-[calc(50%-3rem)] ${
                  i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
