import { PageLayout } from "@/components/layout/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { cmsFAQ, FAQItem } from "@/lib/cms";

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  useEffect(() => {
    setFaqs(cmsFAQ.list());
  }, []);
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
              <AccordionItem key={faq.id || i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6 shadow-card">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </PageLayout>
  );
}
