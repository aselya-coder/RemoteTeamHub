import { PageLayout } from "@/components/layout/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useQuery } from "@tanstack/react-query";
import { getSupabase } from "@/lib/supabase";

export default function FAQ() {
  const supabase = getSupabase();
  const { data: faqs } = useQuery({
    queryKey: ["faqs_public"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faqs").select("id, pertanyaan, jawaban").order("pertanyaan");
      if (error) throw error;
      return data || [];
    },
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">FAQ</p>
            <h1 className="text-4xl font-extrabold text-foreground mb-4">Pertanyaan yang Sering Diajukan</h1>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {(faqs || []).map((faq: any) => (
              <AccordionItem key={faq.id} value={faq.id} className="rounded-xl border border-border bg-card px-6 shadow-card">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.pertanyaan}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.jawaban}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  );
}
