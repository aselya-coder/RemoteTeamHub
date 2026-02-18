import { PageLayout } from "@/components/layout/PageLayout";
import { Pricing } from "@/components/landing/Pricing";
import { CTASection } from "@/components/landing/CTASection";

export default function PricingPage() {
  return (
    <PageLayout noBottomPadding>
      <div className="pt-8">
        <Pricing />
        <CTASection />
      </div>
    </PageLayout>
  );
}
