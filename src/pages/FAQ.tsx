import { PageLayout } from "@/components/layout/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Bagaimana proses rekrutmen talent di KerjaTim.id?", a: "Setiap talent melalui proses screening yang ketat termasuk verifikasi identitas, tes kemampuan, dan interview. Hanya 15% dari pelamar yang lolos seleksi kami." },
  { q: "Berapa lama waktu untuk mendapatkan talent?", a: "Rata-rata 7 hari kerja setelah Anda menyampaikan kebutuhan. Untuk posisi yang lebih spesifik, mungkin membutuhkan waktu hingga 14 hari." },
  { q: "Apakah bisa mengganti talent jika tidak cocok?", a: "Ya, kami memberikan garansi penggantian talent gratis dalam 30 hari pertama jika talent tidak sesuai dengan kebutuhan Anda." },
  { q: "Bagaimana sistem pembayaran?", a: "Pembayaran dilakukan secara bulanan melalui invoice. Kami juga mendukung sistem escrow untuk keamanan kedua belah pihak." },
  { q: "Apakah ada kontrak minimum?", a: "Paket Basic memiliki kontrak minimum 1 bulan. Paket Pro dan Enterprise memiliki opsi kontrak yang lebih fleksibel." },
  { q: "Bagaimana jika saya perlu talent dengan skill khusus?", a: "Hubungi tim kami melalui halaman kontak. Kami akan membantu mencarikan talent dengan keahlian spesifik yang Anda butuhkan." },
];

export default function FAQ() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
            <h1 className="text-4xl font-extrabold text-foreground mb-4">Pertanyaan yang Sering Diajukan</h1>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6 shadow-card">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  );
}
