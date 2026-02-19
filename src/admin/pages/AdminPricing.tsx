import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAdminStore } from "@/admin/store/useAdminStore";

type Form = { id?: string; nama_paket: string; harga: string; periode: string; deskripsi: string; highlight: boolean; fitur: string };

export default function AdminPricing() {
  const { state, actions } = useAdminStore();
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>({ nama_paket: "", harga: "", periode: "", deskripsi: "", highlight: false, fitur: "" });

  const openCreate = () => { setForm({ nama_paket: "", harga: "", periode: "", deskripsi: "", highlight: false, fitur: "" }); setOpen(true); };
  const openEdit = (id: string) => {
    const p = state.pricing.find((x) => x.id === id);
    if (!p) return;
    setForm({ id: p.id, nama_paket: p.nama_paket, harga: p.harga, periode: p.periode || "", deskripsi: p.deskripsi || "", highlight: !!p.highlight, fitur: (p.fitur || []).join("\n") });
    setOpen(true);
  };
  const save = () => {
    const payload = {
      id: form.id || crypto.randomUUID(),
      nama_paket: form.nama_paket.trim(),
      harga: form.harga.trim(),
      periode: form.periode.trim() || undefined,
      deskripsi: form.deskripsi.trim() || undefined,
      highlight: !!form.highlight,
      fitur: form.fitur.split("\n").map((x) => x.trim()).filter(Boolean),
    };
    if (form.id) actions.updatePricing(form.id, payload);
    else actions.addPricing(payload);
    setOpen(false);
  };
  const confirmDelete = (id: string) => setDelId(id);
  const doDelete = () => { if (delId) actions.deletePricing(delId); setDelId(null); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pricing</h1>
        <Button onClick={openCreate}>Tambah Paket</Button>
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Paket</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Periode</th>
              <th className="p-3 text-left">Highlight</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {state.pricing.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-medium">{p.nama_paket}</td>
                <td className="p-3">{p.harga}</td>
                <td className="p-3">{p.periode || ""}</td>
                <td className="p-3">{p.highlight ? "Ya" : "Tidak"}</td>
                <td className="p-3 space-x-2">
                  <Button variant="outline" onClick={() => openEdit(p.id)}>Edit</Button>
                  <Button variant="destructive" onClick={() => confirmDelete(p.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
            {state.pricing.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={5}>Belum ada data pricing</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Paket" : "Tambah Paket"}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Nama Paket</label>
              <Input value={form.nama_paket} onChange={(e) => setForm((f) => ({ ...f, nama_paket: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Harga</label>
              <Input value={form.harga} onChange={(e) => setForm((f) => ({ ...f, harga: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Periode</label>
              <Input value={form.periode} onChange={(e) => setForm((f) => ({ ...f, periode: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Highlight</label>
              <Input value={form.highlight ? "true" : "false"} onChange={(e) => setForm((f) => ({ ...f, highlight: e.target.value === "true" }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Deskripsi</label>
              <Textarea rows={2} value={form.deskripsi} onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Fitur (satu baris per fitur)</label>
              <Textarea rows={4} value={form.fitur} onChange={(e) => setForm((f) => ({ ...f, fitur: e.target.value }))} />
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
            <DialogTitle>Hapus Paket?</DialogTitle>
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
