import { useEffect, useState } from "react";
import { cmsPages } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PrivasiManage() {
  const [item, setItem] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  useEffect(() => {
    const pages = cmsPages.getAll();
    setItem(pages.privasi.content);
    const mode = (import.meta as ImportMeta).env?.VITE_CMS_BACKEND;
    if (mode === "supabase") {
      void cmsPages.syncAll().then(() => {
        const p2 = cmsPages.getAll();
        setItem(p2.privasi.content);
      });
    }
  }, []);

  const openForm = () => {
    setDraft(item);
    setOpen(true);
  };

  const handleCreate = () => {
    setItem(draft);
    cmsPages.update("privasi", { content: draft });
    setOpen(false);
  };

  const handleUpdate = () => {
    setItem(draft);
    cmsPages.update("privasi", { content: draft });
    setOpen(false);
  };

  const handleDelete = () => {
    setItem("");
    cmsPages.update("privasi", { content: "" });
  };

  const desc = item ? item.slice(0, 100) + (item.length > 100 ? "…" : "") : "";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Kebijakan Privasi</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openForm}>Tambah Data</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Konten</DialogTitle>
              <p className="text-sm text-gray-400">Perbarui kebijakan privasi untuk pengguna.</p>
            </DialogHeader>
            <div className="space-y-3">
              <textarea className="w-full min-h-80 p-3 rounded bg-[#1F2937] text-white placeholder:text-gray-400" value={draft} onChange={(e) => setDraft(e.target.value)} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="text-slate-900" onClick={() => setOpen(false)}>Batal</Button>
                <Button onClick={item ? handleUpdate : handleCreate}>Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-[#1F2937] p-4 rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Dokumen Privasi</TableCell>
              <TableCell className="max-w-xl truncate">{desc}</TableCell>
              <TableCell className="space-x-2">
                <Button size="sm" variant="outline" className="text-slate-900" onClick={openForm}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={handleDelete}>Hapus</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
