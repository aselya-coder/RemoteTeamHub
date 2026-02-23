import { useEffect, useState } from "react";
import { cmsPages, TentangPage } from "@/lib/cms";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function TentangManage() {
  const [data, setData] = useState<TentangPage>({ description: "", visi: "", misi: "", team: [] });
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState("");
  const [editIdx, setEditIdx] = useState<number | null>(null);

  useEffect(() => {
    const pages = cmsPages.getAll();
    setData(pages.tentang);
    const mode = (import.meta as ImportMeta).env?.VITE_CMS_BACKEND;
    if (mode === "supabase") {
      void cmsPages.syncAll().then(() => {
        const p2 = cmsPages.getAll();
        setData(p2.tentang);
      });
    }
  }, []);

  const savePage = () => {
    cmsPages.update("tentang", data);
    alert("Tersimpan");
  };

  const openNew = () => {
    setEditIdx(null);
    setName("");
    setRole("");
    setPhoto("");
    setOpen(true);
  };

  const openEdit = (i: number) => {
    const t = data.team[i];
    setEditIdx(i);
    setName(t.name);
    setRole(t.role);
    setPhoto(t.photo || "");
    setOpen(true);
  };

  const handleCreate = () => {
    const team = [...data.team];
    const member = { id: crypto.randomUUID(), name, role, photo };
    team.push(member);
    const next = { ...data, team };
    setData(next);
    cmsPages.update("tentang", next);
    setOpen(false);
  };

  const handleUpdate = () => {
    if (editIdx === null) return;
    const team = [...data.team];
    team[editIdx] = { ...team[editIdx], name, role, photo };
    const next = { ...data, team };
    setData(next);
    cmsPages.update("tentang", next);
    setOpen(false);
  };

  const handleDelete = (i: number) => {
    const team = data.team.filter((_, idx) => idx !== i);
    const next = { ...data, team };
    setData(next);
    cmsPages.update("tentang", next);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kelola Halaman Tentang Kami</h1>
      <div className="bg-[#1F2937] p-4 rounded-xl space-y-3 mb-6">
        <textarea className="w-full p-2 rounded bg-[#111827] text-white placeholder:text-gray-400 min-h-32" placeholder="Deskripsi" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
        <input className="w-full p-2 rounded bg-[#111827] text-white placeholder:text-gray-400" placeholder="Visi" value={data.visi} onChange={(e) => setData({ ...data, visi: e.target.value })} />
        <input className="w-full p-2 rounded bg-[#111827] text-white placeholder:text-gray-400" placeholder="Misi" value={data.misi} onChange={(e) => setData({ ...data, misi: e.target.value })} />
        <div className="text-right"><Button onClick={savePage}>Simpan</Button></div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Tim</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}>Tambah Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editIdx !== null ? "Edit Member" : "Member Baru"}</DialogTitle>
              <p className="text-sm text-gray-400">Lengkapi nama, peran, dan foto anggota tim.</p>
            </DialogHeader>
            <div className="space-y-3">
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Nama" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="URL Foto (opsional)" value={photo} onChange={(e) => setPhoto(e.target.value)} />
              <div className="text-right"><Button onClick={editIdx !== null ? handleUpdate : handleCreate}>Simpan</Button></div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-[#1F2937] p-4 rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.team.map((t, idx) => (
              <TableRow key={t.id}>
                <TableCell>
                  {t.photo ? <img src={t.photo} alt={t.name} className="w-12 h-12 object-cover rounded" /> : "-"}
                </TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.role}</TableCell>
                <TableCell className="space-x-2">
                  <Button size="sm" variant="outline" className="text-slate-900" onClick={() => openEdit(idx)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(idx)}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
