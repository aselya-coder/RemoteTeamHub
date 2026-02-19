import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAdminStore } from "@/admin/store/useAdminStore";

type Form = {
  id?: string;
  posisi: string;
  perusahaan: string;
  lokasi: string;
  tipe_kerja: string;
  gaji: string;
  deskripsi: string;
};

export default function AdminJobs() {
  const { state, actions } = useAdminStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>({ posisi: "", perusahaan: "", lokasi: "", tipe_kerja: "", gaji: "", deskripsi: "" });
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return state.jobs.filter((j) =>
      j.posisi.toLowerCase().includes(q) ||
      j.perusahaan.toLowerCase().includes(q) ||
      j.lokasi.toLowerCase().includes(q) ||
      j.tipe_kerja.toLowerCase().includes(q)
    );
  }, [state.jobs, query]);

  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openCreate = () => {
    setForm({ posisi: "", perusahaan: "", lokasi: "", tipe_kerja: "", gaji: "", deskripsi: "" });
    setOpen(true);
  };

  const openEdit = (id: string) => {
    const j = state.jobs.find((x) => x.id === id);
    if (!j) return;
    setForm({ id: j.id, posisi: j.posisi, perusahaan: j.perusahaan, lokasi: j.lokasi, tipe_kerja: j.tipe_kerja, gaji: j.gaji, deskripsi: j.deskripsi || "" });
    setOpen(true);
  };

  const save = () => {
    const payload = {
      id: form.id || crypto.randomUUID(),
      posisi: form.posisi.trim(),
      perusahaan: form.perusahaan.trim(),
      lokasi: form.lokasi.trim(),
      tipe_kerja: form.tipe_kerja.trim(),
      gaji: form.gaji.trim(),
      deskripsi: form.deskripsi.trim() || undefined,
    };
    if (form.id) actions.updateJob(form.id, payload);
    else actions.addJob(payload);
    setOpen(false);
  };

  const confirmDelete = (id: string) => setDelId(id);
  const doDelete = () => {
    if (delId) actions.deleteJob(delId);
    setDelId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <Button onClick={openCreate}>Tambah Job</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Cari posisi/perusahaan/lokasi" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Posisi</th>
              <th className="p-3 text-left">Perusahaan</th>
              <th className="p-3 text-left">Lokasi</th>
              <th className="p-3 text-left">Tipe Kerja</th>
              <th className="p-3 text-left">Gaji</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="p-3 font-medium">{j.posisi}</td>
                <td className="p-3">{j.perusahaan}</td>
                <td className="p-3">{j.lokasi}</td>
                <td className="p-3">{j.tipe_kerja}</td>
                <td className="p-3">{j.gaji}</td>
                <td className="p-3 space-x-2">
                  <Button variant="outline" onClick={() => openEdit(j.id)}>Edit</Button>
                  <Button variant="destructive" onClick={() => confirmDelete(j.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={6}>Belum ada data job</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
        <div className="text-sm">Hal {page}</div>
        <Button variant="outline" disabled={page * pageSize >= filtered.length} onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Job" : "Tambah Job"}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Posisi</label>
              <Input value={form.posisi} onChange={(e) => setForm((f) => ({ ...f, posisi: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Perusahaan</label>
              <Input value={form.perusahaan} onChange={(e) => setForm((f) => ({ ...f, perusahaan: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Lokasi</label>
              <Input value={form.lokasi} onChange={(e) => setForm((f) => ({ ...f, lokasi: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Tipe Kerja</label>
              <Input value={form.tipe_kerja} onChange={(e) => setForm((f) => ({ ...f, tipe_kerja: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Gaji</label>
              <Input value={form.gaji} onChange={(e) => setForm((f) => ({ ...f, gaji: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Deskripsi</label>
              <Textarea rows={3} value={form.deskripsi} onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={save}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!delId} onOpenChange={() => setDelId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Job?</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDelId(null)}>Batal</Button>
            <Button variant="destructive" onClick={doDelete}>Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
