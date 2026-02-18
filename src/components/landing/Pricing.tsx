import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Basic",
    price: "Rp 5 Jt",
    period: "/talent/bulan",
    description: "Untuk kebutuhan sederhana",
    popular: false,
    features: [
      "1-3 Talent",
      "Screening dasar",
      "Kontrak bulanan",
      "Support email",
      "Laporan bulanan",
    ],
    missing: ["Dedicated account manager", "Priority support", "Custom onboarding"],
  },
  {
    name: "Pro",
    price: "Rp 4 Jt",
    period: "/talent/bulan",
    description: "Paling populer untuk tim berkembang",
    popular: true,
    features: [
      "4-10 Talent",
      "Screening mendalam",
      "Kontrak fleksibel",
      "Support prioritas",
      "Laporan mingguan",
      "Dedicated account manager",
    ],
    missing: ["Custom onboarding"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Untuk perusahaan skala besar",
    popular: false,
    features: [
      "Unlimited Talent",
      "Screening premium",
      "Kontrak custom",
      "24/7 Support",
      "Laporan real-time",
      "Dedicated account manager",
      "Custom onboarding",
    ],
    missing: [],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-soft-gray">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Pricing
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Pilih Paket yang <span className="text-gradient">Tepat</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "gradient-hero text-primary-foreground shadow-card-hover border-2 border-primary"
                  : "bg-card border border-border shadow-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary rounded-full px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Paling Populer
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-1 ${plan.popular ? "" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "text-blue-glow" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-11 ${
                  plan.popular
                    ? "bg-primary-foreground text-navy hover:bg-primary-foreground/90"
                    : "gradient-primary text-primary-foreground shadow-button"
                }`}
              >
                {plan.name === "Enterprise" ? "Hubungi Kami" : "Mulai Sekarang"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
