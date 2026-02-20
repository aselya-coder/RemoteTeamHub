import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/admin/store/useAdminStore";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function TalentCategories() {
  const { state } = useAdminStore();
  const categories = state.categories;
  const whatsappNumber = state.contacts.whatsapp;
  
  const getCategoryMessage = (categoryName: string) => {
    return `Halo, saya tertarik untuk mencari talent di kategori *${categoryName}*. Bisa tolong informasikan lebih lanjut?`;
  };

  const getIcon = (iconName: string): LucideIcon => {
    const Icon = (LucideIcons as any)[iconName] as LucideIcon;
    return Icon || LucideIcons.Folder;
  };

  return (
    <section id="kategori" className="py-20 bg-background relative">
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
          {categories.map((cat) => {
            const Icon = getIcon(cat.icon);
            return (
              <div
                key={cat.id}
                className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:gradient-primary">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-secondary rounded-full px-3 py-1">
                    Mulai {cat.harga}/bln
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{cat.nama}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cat.deskripsi}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:gradient-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all"
                  onClick={() => window.open(getWhatsAppLink(getCategoryMessage(cat.nama), whatsappNumber), '_blank')}
                >
                  Lihat Detail
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
