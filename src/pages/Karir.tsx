import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useAdminStore } from "@/admin/store/useAdminStore";

export default function Karir() {
  const { state } = useAdminStore();
  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">{state.careers.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {state.careers.description}
          </p>
          
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{state.careers.empty_title}</h3>
            <p className="text-muted-foreground mb-6">
              {state.careers.empty_message}
            </p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Kembali ke Beranda
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
