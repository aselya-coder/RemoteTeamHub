import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAdminStore } from "@/admin/store/useAdminStore";

type Form = {
  id?: string;
  nama: string;
  kategori: string;
  skill: string;
  lokasi: string;
  rate: string;
  deskripsi: string;
  kontak: string;
};

export default function AdminTalents() {
  const { state, actions } = useAdminStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>({ nama: "", kategori: "", skill: "", lokasi: "", rate: "", deskripsi: "", kontak: "" });
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return state.talents.filter((t) =>
      t.nama.toLowerCase().includes(q) ||
      t.kategori.toLowerCase().includes(q) ||
      t.lokasi.toLowerCase().includes(q) ||
      t.skill.join(",").toLowerCase().includes(q)
    );
  }, [state.talents, query]);

  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openCreate = () => {
    setForm({ nama: "", kategori: "", skill: "", lokasi: "", rate: "", deskripsi: "", kontak: "" });
    setOpen(true);
  };

  const openEdit = (id: string) => {
    const t = state.talents.find((x) => x.id === id);
    if (!t) return;
    setForm({
      id: t.id,
      nama: t.nama,
      kategori: t.kategori,
      skill: t.skill.join(", "),
      lokasi: t.lokasi,
      rate: t.rate,
      deskripsi: t.deskripsi || "",
      kontak: t.kontak || "",
    });
    setOpen(true);
  };

  const save = () => {
    const payload = {
      id: form.id || crypto.randomUUID(),
      nama: form.nama.trim(),
      kategori: form.kategori.trim(),
      skill: form.skill.split(",").map((s) => s.trim()).filter(Boolean),
      lokasi: form.lokasi.trim(),
      rate: form.rate.trim(),
      deskripsi: form.deskripsi.trim() || undefined,
      kontak: form.kontak.trim() || undefined,
    };
    if (form.id) actions.updateTalent(form.id, payload);
    else actions.addTalent(payload);
    setOpen(false);
  };

  const confirmDelete = (id: string) => setDelId(id);
  const doDelete = () => {
    if (delId) actions.deleteTalent(delId);
    setDelId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Talents</h1>
        <Button onClick={openCreate}>Tambah Talent</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Cari nama/skill/lokasi" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Lokasi</th>
              <th className="p-3 text-left">Rate</th>
              <th className="p-3 text-left">Skill</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="p-3 font-medium">{t.nama}</td>
                <td className="p-3">{t.kategori}</td>
                <td className="p-3">{t.lokasi}</td>
                <td className="p-3">{t.rate}</td>
                <td className="p-3">{t.skill.join(", ")}</td>
                <td className="p-3 space-x-2">
                  <Button variant="outline" onClick={() => openEdit(t.id)}>Edit</Button>
                  <Button variant="destructive" onClick={() => confirmDelete(t.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={6}>Belum ada data talent</td>
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
            <DialogTitle>{form.id ? "Edit Talent" : "Tambah Talent"}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Nama</label>
              <Input value={form.nama} onChange={(e) => setForm((f) => ({ ...f, nama: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Kategori (slug)</label>
              <Input value={form.kategori} onChange={(e) => setForm((f) => ({ ...f, kategori: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Lokasi</label>
              <Input value={form.lokasi} onChange={(e) => setForm((f) => ({ ...f, lokasi: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Rate</label>
              <Input value={form.rate} onChange={(e) => setForm((f) => ({ ...f, rate: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Skill (dipisah koma)</label>
              <Input value={form.skill} onChange={(e) => setForm((f) => ({ ...f, skill: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Deskripsi</label>
              <Textarea rows={3} value={form.deskripsi} onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Kontak</label>
              <Input value={form.kontak} onChange={(e) => setForm((f) => ({ ...f, kontak: e.target.value }))} />
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
            <DialogTitle>Hapus Talent?</DialogTitle>
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
