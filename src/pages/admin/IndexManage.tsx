import { useEffect, useState } from "react";
import { cmsPages, IndexPage } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function IndexManage() {
  const [item, setItem] = useState<IndexPage>({ heroTitle: "", heroDesc: "", ctaText: "" });
  const [open, setOpen] = useState(false);
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDesc, setHeroDesc] = useState("");
  const [ctaText, setCtaText] = useState("");

  useEffect(() => {
    const pages = cmsPages.getAll();
    setItem(pages.index);
    const mode = (import.meta as ImportMeta).env?.VITE_CMS_BACKEND;
    if (mode === "supabase") {
      void cmsPages.syncAll().then(() => {
        const p2 = cmsPages.getAll();
        setItem(p2.index);
      });
    }
  }, []);

  const openForm = () => {
    setHeroTitle(item.heroTitle);
    setHeroDesc(item.heroDesc);
    setCtaText(item.ctaText);
    setOpen(true);
  };

  const handleCreate = () => {
    const next = { heroTitle, heroDesc, ctaText };
    setItem(next);
    cmsPages.update("index", next);
    setOpen(false);
  };

  const handleUpdate = () => {
    const next = { heroTitle, heroDesc, ctaText };
    setItem(next);
    cmsPages.update("index", next);
    setOpen(false);
  };

  const handleDelete = () => {
    const next = { heroTitle: "", heroDesc: "", ctaText: "" };
    setItem(next);
    cmsPages.update("index", next);
  };

  const desc = item.heroDesc ? item.heroDesc.slice(0, 80) + (item.heroDesc.length > 80 ? "…" : "") : "";

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Kelola Halaman Index</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openForm}>Tambah Data</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Hero</DialogTitle>
              <p className="text-sm text-gray-400">Perbarui judul, deskripsi, dan CTA pada halaman utama.</p>
            </DialogHeader>
            <div className="space-y-3">
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Hero Title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
              <textarea className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400 min-h-40" placeholder="Hero Description" value={heroDesc} onChange={(e) => setHeroDesc(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="CTA Text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="text-slate-900" onClick={() => setOpen(false)}>Batal</Button>
                <Button onClick={item.heroTitle || item.heroDesc || item.ctaText ? handleUpdate : handleCreate}>Simpan</Button>
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
              <TableCell>Hero Section</TableCell>
              <TableCell className="max-w-xl truncate">{item.heroTitle} — {desc}</TableCell>
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
