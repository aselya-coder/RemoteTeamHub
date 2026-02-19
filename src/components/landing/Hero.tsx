import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { buildWhatsAppLink } from "@/lib/utils";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";
import { useAdminStore } from "@/admin/store/useAdminStore";

export function Hero() {
  const { state } = useAdminStore();
  return (
    <section id="beranda" className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-blue-light">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              Platform #1 Outsourcing Remote Indonesia
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-primary-foreground">
              {state.landing.hero_title}
            </h1>

            <p className="text-lg text-primary-foreground/70 max-w-lg leading-relaxed">
              {state.landing.hero_subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gradient-primary shadow-button text-base px-8 h-12 group">
                <Link to="/kategori">
                  {state.landing.CTA_text}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 text-base px-8 h-12">
                <a href={buildWhatsAppLink("Halo KerjaTim.id, saya ingin mendaftar sebagai talent.") } target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 h-4 w-4" />
                  Daftar Sebagai Talent
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-primary-foreground">500+</p>
                <p className="text-sm text-primary-foreground/60">Talent Aktif</p>
              </div>
              <div className="w-px h-10 bg-primary-foreground/20" />
              <div>
                <p className="text-2xl font-bold text-primary-foreground">150+</p>
                <p className="text-sm text-primary-foreground/60">Perusahaan</p>
              </div>
              <div className="w-px h-10 bg-primary-foreground/20" />
              <div>
                <p className="text-2xl font-bold text-primary-foreground">98%</p>
                <p className="text-sm text-primary-foreground/60">Kepuasan</p>
              </div>
            </div>
          </div>

          {/* Right illustration */}
          <div className="relative hidden lg:block">
            <div className="animate-float">
              <img
                src={heroImage}
                alt="Tim remote bekerja bersama"
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 30.8C384 29 480 34 576 41.7C672 49.3 768 59.7 864 58.3C960 57 1056 44 1152 38.8C1248 33.7 1344 36.3 1392 37.7L1440 39V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            fill="hsl(0 0% 100%)"
          />
        </svg>
      </div>
    </section>
  );
}
