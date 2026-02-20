import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/admin/store/useAdminStore";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Pricing() {
  const { state } = useAdminStore();
  const pricing = state.pricing;
  const whatsappNumber = state.contacts.whatsapp;
  
  const getPricingMessage = (planName: string) => {
    if (planName === "Enterprise") {
      return `Halo, saya tertarik dengan paket *${planName}* untuk kebutuhan perusahaan saya. Bisa tolong informasikan lebih lanjut mengenai paket ini?`;
    }
    return `Halo, saya tertarik untuk berlangganan paket *${planName}*. Bisa tolong informasikan lebih lanjut?`;
  };

  return (
    <section id="pricing" className="py-20 bg-background">
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
          {pricing.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? "gradient-hero text-primary-foreground shadow-card-hover border-2 border-primary"
                  : "bg-card border border-border shadow-card"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary rounded-full px-4 py-1 text-xs font-semibold text-primary-foreground">
                  Paling Populer
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-lg font-semibold mb-1 ${plan.highlight ? "" : "text-foreground"}`}>
                  {plan.nama_paket}
                </h3>
                <p className={`text-sm mb-4 ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.deskripsi}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{plan.harga}</span>
                  <span className={`text-sm ${plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                    {plan.periode}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.fitur.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-blue-glow" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full h-11 ${
                  plan.highlight
                    ? "bg-primary-foreground text-navy hover:bg-primary-foreground/90"
                    : "gradient-primary text-primary-foreground shadow-button"
                }`}
                onClick={() => window.open(getWhatsAppLink(getPricingMessage(plan.nama_paket), whatsappNumber), '_blank')}
              >
                {plan.nama_paket === "Enterprise" ? "Hubungi Kami" : "Mulai Sekarang"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
