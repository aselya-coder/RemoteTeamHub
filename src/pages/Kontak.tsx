import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useAdminStore } from "@/admin/store/useAdminStore";

export default function Kontak() {
  const { state } = useAdminStore();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Kontak</p>
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Hubungi Kami</h1>
          <p className="text-muted-foreground">Tim kami siap membantu kebutuhan Anda</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <p className="text-muted-foreground text-sm">{state.contacts.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Telepon</h3>
                <p className="text-muted-foreground text-sm">{state.contacts.telepon}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Alamat</h3>
                <p className="text-muted-foreground text-sm">{state.contacts.alamat}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Nama Lengkap" />
                <Input placeholder="Email" type="email" />
              </div>
              <Input placeholder="Subjek" />
              <Textarea placeholder="Pesan Anda" rows={5} />
              <Button className="w-full gradient-primary shadow-button">Kirim Pesan</Button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
