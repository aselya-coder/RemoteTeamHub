import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAdminStore } from "@/admin/store/useAdminStore";

type Form = { id?: string; pertanyaan: string; jawaban: string };

export default function AdminFAQ() {
  const { state, actions } = useAdminStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>({ pertanyaan: "", jawaban: "" });
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return state.faq.filter((f) => f.pertanyaan.toLowerCase().includes(q));
  }, [state.faq, query]);

  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openCreate = () => { setForm({ pertanyaan: "", jawaban: "" }); setOpen(true); };
  const openEdit = (id: string) => {
    const f = state.faq.find((x) => x.id === id);
    if (!f) return;
    setForm({ id: f.id, pertanyaan: f.pertanyaan, jawaban: f.jawaban });
    setOpen(true);
  };
  const save = () => {
    const payload = { id: form.id || crypto.randomUUID(), pertanyaan: form.pertanyaan.trim(), jawaban: form.jawaban.trim() };
    if (form.id) actions.updateFAQ(form.id, payload);
    else actions.addFAQ(payload);
    setOpen(false);
  };
  const confirmDelete = (id: string) => setDelId(id);
  const doDelete = () => { if (delId) actions.deleteFAQ(delId); setDelId(null); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">FAQ</h1>
        <Button onClick={openCreate}>Tambah FAQ</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Cari pertanyaan" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Pertanyaan</th>
              <th className="p-3 text-left">Jawaban</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-3 font-medium">{f.pertanyaan}</td>
                <td className="p-3 text-muted-foreground">{f.jawaban}</td>
                <td className="p-3 space-x-2">
                  <Button variant="outline" onClick={() => openEdit(f.id)}>Edit</Button>
                  <Button variant="destructive" onClick={() => confirmDelete(f.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={3}>Belum ada data FAQ</td>
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
            <DialogTitle>{form.id ? "Edit FAQ" : "Tambah FAQ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs">Pertanyaan</label>
              <Input value={form.pertanyaan} onChange={(e) => setForm((f) => ({ ...f, pertanyaan: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Jawaban</label>
              <Textarea rows={3} value={form.jawaban} onChange={(e) => setForm((f) => ({ ...f, jawaban: e.target.value }))} />
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
            <DialogTitle>Hapus FAQ?</DialogTitle>
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
