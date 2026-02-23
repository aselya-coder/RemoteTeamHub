import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { useEffect, useState } from "react";
import { cmsPages } from "@/lib/cms";
import { toast } from "@/components/ui/sonner";

export default function Kontak() {
  const [email, setEmail] = useState("hello@kerjatim.id");
  const [phone, setPhone] = useState("+62 21 1234 5678");
  const [address, setAddress] = useState("Jakarta, Indonesia");
  const [nama, setNama] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subjek, setSubjek] = useState("");
  const [pesan, setPesan] = useState("");
  const [errors, setErrors] = useState<{ nama?: string; email?: string; subjek?: string; pesan?: string }>({});
  useEffect(() => {
    const pages = cmsPages.getAll();
    const k = pages.kontak;
    setEmail(k.email || "hello@kerjatim.id");
    setPhone(k.phone || "+62 21 1234 5678");
    setAddress(k.address || "Jakarta, Indonesia");
    const mode = (import.meta as ImportMeta).env?.VITE_CMS_BACKEND;
    if (mode === "supabase") {
      void cmsPages.syncAll().then(() => {
        const p2 = cmsPages.getAll();
        const k2 = p2.kontak;
        setEmail(k2.email || "hello@kerjatim.id");
        setPhone(k2.phone || "+62 21 1234 5678");
        setAddress(k2.address || "Jakarta, Indonesia");
      });
    }
  }, []);

  const validate = () => {
    const next: { nama?: string; email?: string; subjek?: string; pesan?: string } = {};
    if (!nama.trim()) next.nama = "Nama lengkap wajib diisi";
    const em = emailInput.trim();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
    if (!em) next.email = "Email wajib diisi"; else if (!okEmail) next.email = "Format email tidak valid";
    if (!subjek.trim()) next.subjek = "Subjek wajib diisi";
    if (!pesan.trim() || pesan.trim().length < 10) next.pesan = "Pesan minimal 10 karakter";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
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
                <p className="text-muted-foreground text-sm">{email}</p>
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
                    const url = getWhatsAppLink("Halo, saya ingin berkonsultasi.", phone);
                    window.open(url, "_blank");
                  }}
                >{phone}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Alamat</h3>
                <p className="text-muted-foreground text-sm">{address}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input placeholder="Nama Lengkap" name="nama" value={nama} onChange={(e) => setNama(e.target.value)} className={errors.nama ? "border-red-500" : ""} />
                <Input placeholder="Email" type="email" name="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} className={errors.email ? "border-red-500" : ""} />
              </div>
              {errors.nama ? <p className="text-red-500 text-xs">{errors.nama}</p> : null}
              {errors.email ? <p className="text-red-500 text-xs">{errors.email}</p> : null}
              <Input placeholder="Subjek" name="subjek" value={subjek} onChange={(e) => setSubjek(e.target.value)} className={errors.subjek ? "border-red-500" : ""} />
              {errors.subjek ? <p className="text-red-500 text-xs">{errors.subjek}</p> : null}
              <Textarea placeholder="Pesan Anda" rows={5} name="pesan" value={pesan} onChange={(e) => setPesan(e.target.value)} className={errors.pesan ? "border-red-500" : ""} />
              {errors.pesan ? <p className="text-red-500 text-xs">{errors.pesan}</p> : null}
              <Button className="w-full gradient-primary shadow-button"
                onClick={(e) => {
                  e.preventDefault();
                  if (!validate()) {
                    toast.error("Mohon lengkapi form kontak dengan benar");
                    return;
                  }
                  const msg = `Halo, saya mengirim pesan melalui halaman Kontak.\n\n`+
                    `Nama: ${nama}\n`+
                    `Email: ${emailInput}\n`+
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
