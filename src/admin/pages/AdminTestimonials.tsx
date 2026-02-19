import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAdminStore } from "@/admin/store/useAdminStore";

type Form = { id?: string; nama: string; jabatan: string; rating: string; isi_testimoni: string };

export default function AdminTestimonials() {
  const { state, actions } = useAdminStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>({ nama: "", jabatan: "", rating: "5", isi_testimoni: "" });

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return state.testimonials.filter((t) => t.nama.toLowerCase().includes(q) || t.jabatan.toLowerCase().includes(q));
  }, [state.testimonials, query]);

  const openCreate = () => { setForm({ nama: "", jabatan: "", rating: "5", isi_testimoni: "" }); setOpen(true); };
  const openEdit = (id: string) => {
    const t = state.testimonials.find((x) => x.id === id);
    if (!t) return;
    setForm({ id: t.id, nama: t.nama, jabatan: t.jabatan, rating: String(t.rating || 5), isi_testimoni: t.isi_testimoni });
    setOpen(true);
  };
  const save = () => {
    const payload = { id: form.id || crypto.randomUUID(), nama: form.nama.trim(), jabatan: form.jabatan.trim(), rating: Number(form.rating) || 5, isi_testimoni: form.isi_testimoni.trim() };
    if (form.id) actions.updateTestimonial(form.id, payload);
    else actions.addTestimonial(payload);
    setOpen(false);
  };
  const confirmDelete = (id: string) => setDelId(id);
  const doDelete = () => { if (delId) actions.deleteTestimonial(delId); setDelId(null); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Testimonials</h1>
        <Button onClick={openCreate}>Tambah Testimoni</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Cari nama/jabatan" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Jabatan</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-left">Testimoni</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3 font-medium">{t.nama}</td>
                <td className="p-3">{t.jabatan}</td>
                <td className="p-3">{t.rating || 5}</td>
                <td className="p-3 text-muted-foreground">{t.isi_testimoni}</td>
                <td className="p-3 space-x-2">
                  <Button variant="outline" onClick={() => openEdit(t.id)}>Edit</Button>
                  <Button variant="destructive" onClick={() => confirmDelete(t.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={5}>Belum ada testimoni</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Testimoni" : "Tambah Testimoni"}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Nama</label>
              <Input value={form.nama} onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Jabatan</label>
              <Input value={form.jabatan} onChange={(e) => setForm((f) => ({ ...f, jabatan: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Rating</label>
              <Input value={form.rating} onChange={(e) => setForm((f) => ({ ...f, rating: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Testimoni</label>
              <Textarea rows={3} value={form.isi_testimoni} onChange={(e) => setForm((f) => ({ ...f, isi_testimoni: e.target.value }))} />
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
            <DialogTitle>Hapus Testimoni?</DialogTitle>
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
