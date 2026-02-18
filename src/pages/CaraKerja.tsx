import { PageLayout } from "@/components/layout/PageLayout";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CTASection } from "@/components/landing/CTASection";

export default function CaraKerja() {
  return (
    <PageLayout noBottomPadding>
      <div className="pt-8">
        <HowItWorks />
        <CTASection />
      </div>
    </PageLayout>
  );
}
