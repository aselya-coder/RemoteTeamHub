import { useEffect, useState } from "react";
import { cmsPages, KontakPage } from "@/lib/cms";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function KontakManage() {
  const [item, setItem] = useState<KontakPage>({ email: "", phone: "", address: "" });
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const pages = cmsPages.getAll();
    setItem(pages.kontak);
    const mode = (import.meta as ImportMeta).env?.VITE_CMS_BACKEND;
    if (mode === "supabase") {
      void cmsPages.syncAll().then(() => {
        const p2 = cmsPages.getAll();
        setItem(p2.kontak);
      });
    }
  }, []);

  const openForm = () => {
    setEmail(item.email);
    setPhone(item.phone);
    setAddress(item.address);
    setOpen(true);
  };

  const handleCreate = () => {
    const next = { email, phone, address };
    setItem(next);
    cmsPages.update("kontak", next);
    setOpen(false);
  };

  const handleUpdate = () => {
    const next = { email, phone, address };
    setItem(next);
    cmsPages.update("kontak", next);
    setOpen(false);
  };

  const handleDelete = () => {
    const next = { email: "", phone: "", address: "" };
    setItem(next);
    cmsPages.update("kontak", next);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Kelola Kontak</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openForm}>Tambah Data</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Kontak</DialogTitle>
              <p className="text-sm text-gray-400">Perbarui informasi email, telepon, dan alamat.</p>
            </DialogHeader>
            <div className="space-y-3">
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Telepon" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Alamat" value={address} onChange={(e) => setAddress(e.target.value)} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="text-slate-900" onClick={() => setOpen(false)}>Batal</Button>
                <Button onClick={item.email || item.phone || item.address ? handleUpdate : handleCreate}>Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-[#1F2937] p-4 rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Telepon</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{item.email || "-"}</TableCell>
              <TableCell>{item.phone || "-"}</TableCell>
              <TableCell className="max-w-xl truncate">{item.address || "-"}</TableCell>
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
