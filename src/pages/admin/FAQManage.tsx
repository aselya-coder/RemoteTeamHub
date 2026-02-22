import { useEffect, useState } from "react";
import { cmsFAQ, FAQItem } from "@/lib/cms";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function FAQManage() {
  const [items, setItems] = useState<FAQItem[]>(cmsFAQ.list());
  useEffect(() => {
    const mode = (import.meta as ImportMeta).env?.VITE_CMS_BACKEND;
    if (mode === "supabase") {
      void cmsFAQ.syncFromRemote().then(() => setItems(cmsFAQ.list()));
    }
  }, []);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState<FAQItem | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const reset = () => {
    setEdit(null);
    setQuestion("");
    setAnswer("");
  };

  const startEdit = (f: FAQItem) => {
    setEdit(f);
    setQuestion(f.question);
    setAnswer(f.answer);
    setOpen(true);
  };

  const save = () => {
    if (edit) {
      cmsFAQ.update(edit.id, { question, answer });
    } else {
      cmsFAQ.create({ question, answer });
    }
    setItems(cmsFAQ.list());
    setOpen(false);
    reset();
  };

  const remove = (id: string) => {
    cmsFAQ.remove(id);
    setItems(cmsFAQ.list());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Kelola FAQ</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => reset()}>Tambah FAQ</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{edit ? "Edit FAQ" : "FAQ Baru"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <input className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400" placeholder="Pertanyaan" value={question} onChange={(e) => setQuestion(e.target.value)} />
              <textarea className="w-full p-2 rounded bg-[#1F2937] text-white placeholder:text-gray-400 min-h-32" placeholder="Jawaban" value={answer} onChange={(e) => setAnswer(e.target.value)} />
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
              <TableHead>Pertanyaan</TableHead>
              <TableHead>Jawaban</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{f.question}</TableCell>
                <TableCell className="max-w-xl truncate">{f.answer}</TableCell>
                <TableCell className="space-x-2">
                  <Button size="sm" variant="outline" className="text-slate-900" onClick={() => startEdit(f)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => remove(f.id)}>Hapus</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
