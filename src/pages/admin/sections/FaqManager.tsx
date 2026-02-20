import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  pertanyaan: z.string().min(5),
  jawaban: z.string().min(5),
});

export default function FaqManager() {
  const supabase = getSupabase();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const form = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema), defaultValues: { pertanyaan: "", jawaban: "" } });

  const { data, isLoading } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const { data, error } = await supabase.from("faqs").select("id, pertanyaan, jawaban").order("pertanyaan");
      if (error) throw error;
      return data || [];
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    if (editing) {
      const { error } = await supabase.from("faqs").update(values).eq("id", editing);
      if (error) return;
    } else {
      const { error } = await supabase.from("faqs").insert(values);
      if (error) return;
    }
    setOpen(false);
    setEditing(null);
    form.reset({ pertanyaan: "", jawaban: "" });
    qc.invalidateQueries({ queryKey: ["faqs"] });
  }

  async function onEdit(row: any) {
    setEditing(row.id);
    form.reset({ pertanyaan: row.pertanyaan, jawaban: row.jawaban });
    setOpen(true);
  }

  async function onDelete(id: string) {
    const { error } = await supabase.from("faqs").delete().eq("id", id);
    if (!error) qc.invalidateQueries({ queryKey: ["faqs"] });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditing(null); form.reset({ pertanyaan: "", jawaban: "" }); } }}>
          <DialogTrigger asChild>
            <Button>Tambah FAQ</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Ubah FAQ" : "Tambah FAQ"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField name="pertanyaan" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pertanyaan</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="jawaban" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jawaban</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Batal</Button>
                  <Button type="submit">Simpan</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pertanyaan</TableHead>
              <TableHead>Jawaban</TableHead>
              <TableHead className="w-[140px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={3}>Memuat...</TableCell></TableRow>
            ) : data && data.length > 0 ? (
              data.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.pertanyaan}</TableCell>
                  <TableCell>{row.jawaban}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(row)}>Ubah</Button>
                      <Button size="sm" variant="destructive" onClick={() => onDelete(row.id)}>Hapus</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={3}>Belum ada data</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

