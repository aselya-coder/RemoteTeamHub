import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { useQuery } from "@tanstack/react-query";
import { getSupabase } from "@/lib/supabase";

export function CTASection() {
  const supabase = getSupabase();
  const { data: landing } = useQuery({
    queryKey: ["landing_public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("landing").select("cta_title, cta_subtitle, cta_button_text").limit(1).maybeSingle();
      if (error) throw error;
      return data || { cta_title: "Siap Punya Tim Remote Profesional?", cta_subtitle: "", cta_button_text: "Hire Sekarang" };
    },
  });
  const { data: whatsappNumber } = useQuery({
    queryKey: ["contacts_whatsapp"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contacts").select("whatsapp").limit(1).maybeSingle();
      if (error) throw error;
      return data?.whatsapp as string | undefined;
    },
  });
  
  const whatsappCTAMessage = `Halo, saya tertarik untuk *hire talent remote* melalui KerjaTim.id. Bisa tolong informasikan lebih lanjut?`;

  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6">
          {(landing?.cta_title) || "Siap Punya Tim Remote Profesional?"}
        </h2>
        <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-10">
          {(landing?.cta_subtitle) || "Bergabung dengan 150+ perusahaan yang sudah mempercayakan rekrutmen remote mereka kepada KerjaTim.id"}
        </p>
        <Button
          size="lg"
          className="gradient-primary shadow-button px-10 h-14 text-lg group"
          onClick={() => window.open(getWhatsAppLink(whatsappCTAMessage, whatsappNumber), '_blank')}
        >
          {(landing?.cta_button_text) || "Hire Sekarang"}
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
