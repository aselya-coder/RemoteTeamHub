import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";
import { useAdminStore } from "@/admin/store/useAdminStore";

export default function Karir() {
  const { state } = useAdminStore();
  const careers = state.careers;
  const jobs = state.jobs;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">{careers.title}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {careers.description}
          </p>
          
          {jobs.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{careers.empty_title}</h3>
              <p className="text-muted-foreground mb-6">
                {careers.empty_message}
              </p>
              <Button variant="outline" onClick={() => window.history.back()}>
                Kembali ke Beranda
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="bg-card border border-border rounded-xl p-6 shadow-sm text-left">
                  <h3 className="text-xl font-semibold mb-2">{job.posisi}</h3>
                  <p className="text-muted-foreground mb-2">{job.perusahaan} • {job.lokasi} • {job.tipe_kerja}</p>
                  <p className="text-primary font-semibold mb-2">{job.gaji}</p>
                  {job.deskripsi && <p className="text-sm text-muted-foreground">{job.deskripsi}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
