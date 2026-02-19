import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAdminStore } from "@/admin/store/useAdminStore";

export function CTASection() {
  const { state } = useAdminStore();
  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6">
          {state.landing.cta_title}
          <span className="text-gradient">Profesional?</span>
        </h2>
        <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-10">
          {state.landing.cta_subtitle}
        </p>
        <Button asChild size="lg" className="gradient-primary shadow-button px-10 h-14 text-lg group">
          <Link to="/kategori">
            {state.landing.cta_button_text || "Hire Sekarang"}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
