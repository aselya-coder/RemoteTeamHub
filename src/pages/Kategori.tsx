import { PageLayout } from "@/components/layout/PageLayout";
import { TalentCategories } from "@/components/landing/TalentCategories";
import { CTASection } from "@/components/landing/CTASection";

export default function Kategori() {
  return (
    <PageLayout>
      <div className="pt-8">
        <TalentCategories />
        <CTASection />
      </div>
    </PageLayout>
  );
}
