import { useAdminStore } from "@/admin/store/useAdminStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { state } = useAdminStore();
  const stats = [
    { label: "Talents", value: state.talents.length, to: "/admin/talents" },
    { label: "Jobs", value: state.jobs.length, to: "/admin/jobs" },
    { label: "Categories", value: state.categories.length, to: "/admin/categories" },
    { label: "Blogs", value: state.blogs.length, to: "/admin/blogs" },
    { label: "FAQ", value: state.faq.length, to: "/admin/faq" },
    { label: "Pricing", value: state.pricing.length, to: "/admin/pricing" },
    { label: "Testimonials", value: state.testimonials.length, to: "/admin/testimonials" },
  ];
  const latestJobs = state.jobs.slice(0, 5);
  const latestTalents = state.talents.slice(0, 5);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border">
            <CardHeader>
              <CardTitle className="text-base">{s.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-3xl font-bold">{s.value}</div>
              <Link to={s.to}>
                <Button variant="outline">Lihat</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Jobs Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Posisi</TableHead>
                  <TableHead>Perusahaan</TableHead>
                  <TableHead>Lokasi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestJobs.map((j) => (
                  <TableRow key={j.id}>
                    <TableCell className="font-medium">{j.posisi}</TableCell>
                    <TableCell>{j.perusahaan}</TableCell>
                    <TableCell>{j.lokasi}</TableCell>
                  </TableRow>
                ))}
                {latestJobs.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground">Belum ada job</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Talents Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Lokasi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {latestTalents.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.nama}</TableCell>
                    <TableCell>{t.kategori}</TableCell>
                    <TableCell>{t.lokasi}</TableCell>
                  </TableRow>
                ))}
                {latestTalents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-muted-foreground">Belum ada talent</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
