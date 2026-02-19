import { useMemo, useState } from "react";
import { useAdminStore } from "@/admin/store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type FormState = {
  id?: string;
  slug: string;
  nama: string;
  icon: string;
  deskripsi: string;
  harga: string;
};

export default function AdminCategories() {
  const { state, actions } = useAdminStore();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ slug: "", nama: "", icon: "", deskripsi: "", harga: "" });
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return state.categories.filter(
      (c) => c.nama.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q) || c.deskripsi.toLowerCase().includes(q),
    );
  }, [state.categories, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const startAdd = () => {
    setForm({ slug: "", nama: "", icon: "", deskripsi: "", harga: "" });
    setOpen(true);
  };
  const startEdit = (id: string) => {
    const c = state.categories.find((x) => x.id === id);
    if (!c) return;
    setForm({ id: c.id, slug: c.slug, nama: c.nama, icon: c.icon, deskripsi: c.deskripsi, harga: c.harga });
    setOpen(true);
  };
  const submitForm = () => {
    if (!form.nama || !form.slug) return;
    if (!form.id) {
      actions.addCategory({ id: crypto.randomUUID(), ...form });
    } else {
      actions.updateCategory(form.id, { ...form });
    }
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={startAdd}>Tambah</Button>
      </div>
      <div className="flex items-center gap-2">
        <Input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-xs" />
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Icon</th>
              <th className="p-3 text-left">Harga</th>
              <th className="p-3 text-left">Deskripsi</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.nama}</td>
                <td className="p-3">{c.slug}</td>
                <td className="p-3">{c.icon}</td>
                <td className="p-3">{c.harga}</td>
                <td className="p-3">{c.deskripsi}</td>
                <td className="p-3 flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => startEdit(c.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => setConfirmId(c.id)}>Delete</Button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td className="p-4 text-center text-muted-foreground" colSpan={6}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
        <span className="text-sm">Page {page} / {totalPages}</span>
        <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{form.id ? "Edit Category" : "Tambah Category"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Nama</label>
              <Input value={form.nama} onChange={(e) => setForm({ ...form, nama: e.target.value })} />
            </div>
            <div>
              <label className="text-xs">Slug</label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div>
              <label className="text-xs">Icon</label>
              <Input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
            </div>
            <div>
              <label className="text-xs">Harga</label>
              <Input value={form.harga} onChange={(e) => setForm({ ...form, harga: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Deskripsi</label>
              <Input value={form.deskripsi} onChange={(e) => setForm({ ...form, deskripsi: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={submitForm}>{form.id ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!confirmId} onOpenChange={(v) => !v && setConfirmId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus Category</DialogTitle>
          </DialogHeader>
          <p className="text-sm">Apakah Anda yakin ingin menghapus item ini?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmId(null)}>Batal</Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmId) actions.deleteCategory(confirmId);
                setConfirmId(null);
              }}
            >Hapus</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

