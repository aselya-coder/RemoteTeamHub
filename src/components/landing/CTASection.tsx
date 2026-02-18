import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-6">
          Siap Punya Tim Remote{" "}
          <span className="text-gradient">Profesional?</span>
        </h2>
        <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-10">
          Bergabung dengan 150+ perusahaan yang sudah mempercayakan rekrutmen remote mereka kepada KerjaTim.id
        </p>
        <Button
          size="lg"
          className="gradient-primary shadow-button text-base px-10 h-14 text-lg group"
        >
          Hire Sekarang
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </section>
  );
}
