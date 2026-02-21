import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function Kontak() {
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
                <p className="text-muted-foreground text-sm">hello@kerjatim.id</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Telepon</h3>
                <p className="text-muted-foreground text-sm"
                  onClick={() => {
                    const url = getWhatsAppLink("Halo, saya ingin berkonsultasi.", "+62 21 1234 5678");
                    window.open(url, "_blank");
                  }}
                >+62 21 1234 5678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Alamat</h3>
                <p className="text-muted-foreground text-sm">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Nama Lengkap" name="nama" id="kontak-nama" />
                <Input placeholder="Email" type="email" name="email" id="kontak-email" />
              </div>
              <Input placeholder="Subjek" name="subjek" id="kontak-subjek" />
              <Textarea placeholder="Pesan Anda" rows={5} name="pesan" id="kontak-pesan" />
              <Button className="w-full gradient-primary shadow-button"
                onClick={(e) => {
                  e.preventDefault();
                  const nama = (document.getElementById("kontak-nama") as HTMLInputElement | null)?.value || "";
                  const email = (document.getElementById("kontak-email") as HTMLInputElement | null)?.value || "";
                  const subjek = (document.getElementById("kontak-subjek") as HTMLInputElement | null)?.value || "";
                  const pesan = (document.getElementById("kontak-pesan") as HTMLTextAreaElement | null)?.value || "";
                  const msg = `Halo, saya mengirim pesan melalui halaman Kontak.\n\n`+
                    `Nama: ${nama}\n`+
                    `Email: ${email}\n`+
                    `Subjek: ${subjek}\n`+
                    `Pesan: ${pesan}`;
                  const url = getWhatsAppLink(msg);
                  window.open(url, "_blank");
                }}
              >Kirim Pesan</Button>
            </form>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
