import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

export default function Karir() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Bergabung dengan Tim Kami</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Kami selalu mencari individu berbakat yang ingin membuat dampak nyata dalam dunia kerja remote.
          </p>
          
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Belum ada posisi terbuka</h3>
            <p className="text-muted-foreground mb-6">
              Saat ini kami belum membuka lowongan baru. Silakan cek kembali nanti atau ikuti media sosial kami untuk update terbaru.
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
