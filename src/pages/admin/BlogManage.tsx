import { useEffect, useState } from "react";
import { cmsBlogs, BlogPost } from "@/lib/cms";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function BlogManage() {
  const [items, setItems] = useState<BlogPost[]>(cmsBlogs.list());
  useEffect(() => {
    const mode = (import.meta as ImportMeta).env?.VITE_CMS_BACKEND;
    if (mode === "supabase") {
      void cmsBlogs.syncFromRemote().then(() => setItems(cmsBlogs.list()));
    }
  }, []);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const reset = () => {
    setEdit(null);
    setTitle("");
    setContent("");
    setThumbnail("");
    setDate("");
    setAuthor("");
    setCategory("");
    setExcerpt("");
  };

  const startEdit = (b: BlogPost) => {
    setEdit(b);
    setTitle(b.title);
    setContent(b.content);
    setThumbnail(b.thumbnail || "");
    setDate(b.date);
    setAuthor(b.author);
    setCategory(b.category || "");
    setExcerpt(b.excerpt || "");
    setOpen(true);
  };

  const save = () => {
    if (edit) {
      cmsBlogs.update(edit.id, { title, content, thumbnail, date, author, category, excerpt });
    } else {
      cmsBlogs.create({ title, content, thumbnail, date, author, category, excerpt });
    }
    setItems(cmsBlogs.list());
    setOpen(false);
    reset();
  };

  const remove = (id: string) => {
    cmsBlogs.remove(id);
    setItems(cmsBlogs.list());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Kelola Blog</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => reset()}>Tambah Artikel</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{edit ? "Edit Artikel" : "Artikel Baru"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Tanggal (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Penulis" value={author} onChange={(e) => setAuthor(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Thumbnail URL" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} />
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
              <textarea className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400 min-h-40" placeholder="Konten" value={content} onChange={(e) => setContent(e.target.value)} />
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="text-slate-900" onClick={() => setOpen(false)}>Batal</Button>
                <Button onClick={save}>Simpan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-[#1F2937] p-4 rounded-xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Judul</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.title}</TableCell>
                <TableCell>{b.date}</TableCell>
                <TableCell>{b.author}</TableCell>
                <TableCell>{b.category || ""}</TableCell>
                <TableCell className="space-x-2">
                  <Button size="sm" variant="outline" className="text-slate-900" onClick={() => startEdit(b)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(b.id)}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
