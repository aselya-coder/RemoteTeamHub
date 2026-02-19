import { PageLayout } from "@/components/layout/PageLayout";
import { TalentCategories } from "@/components/landing/TalentCategories";
import { CTASection } from "@/components/landing/CTASection";

export default function CariTalent() {
  return (
    <PageLayout noBottomPadding>
      <div className="pt-8">
        <div className="container mx-auto px-4 lg:px-8 text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cari Talent Terbaik</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan profesional berpengalaman untuk tim Anda dalam hitungan hari.
          </p>
        </div>
        <TalentCategories />
        <CTASection />
      </div>
    </PageLayout>
  );
}
