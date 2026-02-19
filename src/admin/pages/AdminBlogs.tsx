import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAdminStore } from "@/admin/store/useAdminStore";

type Form = { id?: string; judul: string; category: string; tanggal: string; author: string; konten: string };

export default function AdminBlogs() {
  const { state, actions } = useAdminStore();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [form, setForm] = useState<Form>({ judul: "", category: "", tanggal: "", author: "", konten: "" });
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return state.blogs.filter((b) =>
      (b.judul || "").toLowerCase().includes(q) ||
      (b.category || "").toLowerCase().includes(q) ||
      (b.author || "").toLowerCase().includes(q)
    );
  }, [state.blogs, query]);

  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openCreate = () => {
    setForm({ judul: "", category: "", tanggal: "", author: "", konten: "" });
    setOpen(true);
  };
  const openEdit = (id: string) => {
    const b = state.blogs.find((x) => x.id === id);
    if (!b) return;
    setForm({ id: b.id, judul: b.judul, category: b.category || "", tanggal: b.tanggal, author: b.author, konten: b.konten });
    setOpen(true);
  };
  const save = () => {
    const payload = { id: form.id || crypto.randomUUID(), judul: form.judul.trim(), category: form.category.trim() || undefined, tanggal: form.tanggal.trim(), author: form.author.trim(), konten: form.konten.trim() };
    if (form.id) actions.updateBlog(form.id, payload);
    else actions.addBlog(payload);
    setOpen(false);
  };
  const confirmDelete = (id: string) => setDelId(id);
  const doDelete = () => { if (delId) actions.deleteBlog(delId); setDelId(null); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <Button onClick={openCreate}>Tambah Blog</Button>
      </div>
      <div className="flex gap-2">
        <Input placeholder="Cari judul/kategori/author" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Judul</th>
              <th className="p-3 text-left">Kategori</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left">Author</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-3 font-medium">{b.judul}</td>
                <td className="p-3">{b.category}</td>
                <td className="p-3">{b.tanggal}</td>
                <td className="p-3">{b.author}</td>
                <td className="p-3 space-x-2">
                  <Button variant="outline" onClick={() => openEdit(b.id)}>Edit</Button>
                  <Button variant="destructive" onClick={() => confirmDelete(b.id)}>Hapus</Button>
                </td>
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={5}>Belum ada data blog</td>
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
            <DialogTitle>{form.id ? "Edit Blog" : "Tambah Blog"}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Judul</label>
              <Input value={form.judul} onChange={(e) => setForm((f) => ({ ...f, judul: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Kategori</label>
              <Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Tanggal</label>
              <Input value={form.tanggal} onChange={(e) => setForm((f) => ({ ...f, tanggal: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Author</label>
              <Input value={form.author} onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Konten</label>
              <Textarea rows={4} value={form.konten} onChange={(e) => setForm((f) => ({ ...f, konten: e.target.value }))} />
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
            <DialogTitle>Hapus Blog?</DialogTitle>
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
