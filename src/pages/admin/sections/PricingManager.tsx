import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useMemo, useState } from "react";

type Pricing = { id: string; nama_paket: string; harga: string | null; highlight: boolean };

export default function PricingManager() {
  const supabase = getSupabase();
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Pricing | null>(null);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [highlight, setHighlight] = useState(false);
  const [featuresText, setFeaturesText] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pricing").select("id, nama_paket, harga, highlight, pricing_features(id, feature, position)").order("nama_paket");
      if (error) throw error;
      return data as any[];
    },
  });

  const rows = data || [];

  function resetForm(p?: Pricing | null, features?: string[]) {
    setEditing(p || null);
    setNama(p?.nama_paket || "");
    setHarga(p?.harga || "");
    setHighlight(!!p?.highlight);
    setFeaturesText((features || []).join("\n"));
  }

  useEffect(() => {
    if (!open) resetForm(null, []);
  }, [open]);

  async function openEdit(row: any) {
    resetForm(row as Pricing, (row?.pricing_features || []).sort((a: any,b: any)=> (a.position||0)-(b.position||0)).map((f: any) => f.feature));
    setOpen(true);
  }

  async function save() {
    if (editing) {
      const { error } = await supabase.from("pricing").update({ nama_paket: nama, harga, highlight }).eq("id", editing.id);
      if (error) return;
      const lines = featuresText.split("\n").map(s => s.trim()).filter(Boolean);
      await supabase.from("pricing_features").delete().eq("pricing_id", editing.id);
      if (lines.length) {
        await supabase.from("pricing_features").insert(
          lines.map((feature, idx) => ({ pricing_id: editing.id, feature, position: idx + 1 }))
        );
      }
    }
    setOpen(false);
    qc.invalidateQueries({ queryKey: ["pricing"] });
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pricing</h2>
        <div />
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paket</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Highlight</TableHead>
              <TableHead>Fitur</TableHead>
              <TableHead className="w-[120px]">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5}>Memuat...</TableCell></TableRow>
            ) : rows.length ? (
              rows.map((r: any) => (
                <TableRow key={r.id}>
                  <TableCell>{r.nama_paket}</TableCell>
                  <TableCell>{r.harga}</TableCell>
                  <TableCell>{r.highlight ? "Ya" : "Tidak"}</TableCell>
                  <TableCell>{(r.pricing_features || []).map((f: any) => f.feature).join(", ")}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => openEdit(r)}>Ubah</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={5}>Belum ada data</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Ubah Paket</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid gap-2">
              <label className="text-sm">Nama Paket</label>
              <Input value={nama} onChange={e => setNama(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Harga</label>
              <Input value={harga} onChange={e => setHarga(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="highlight" checked={highlight} onCheckedChange={(v:any)=> setHighlight(!!v)} />
              <label htmlFor="highlight" className="text-sm">Highlight</label>
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Fitur (satu per baris)</label>
              <Textarea rows={6} value={featuresText} onChange={e => setFeaturesText(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
              <Button onClick={save}>Simpan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
