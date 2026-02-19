import { useAdminStore } from "@/admin/store/useAdminStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Users, Target, Award, Globe, Shield, Clock, FileCheck, RefreshCw } from "lucide-react";
import { useState } from "react";

const icons = { Users, Target, Award, Globe } as const;
const benefitIcons = { Shield, Clock, FileCheck, RefreshCw } as const;

export default function AdminAbout() {
  const { state, actions } = useAdminStore();
  const [open, setOpen] = useState(false as boolean);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [valForm, setValForm] = useState<{ icon: string; title: string; desc: string }>({ icon: "Users", title: "", desc: "" });
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">About</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs">Judul</label>
          <Input value={state.about.judul} onChange={(e) => actions.updateAbout({ judul: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-xs">Visi</label>
          <Input value={state.about.visi} onChange={(e) => actions.updateAbout({ visi: e.target.value })} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs">Deskripsi</label>
          <Textarea rows={2} value={state.about.deskripsi} onChange={(e) => actions.updateAbout({ deskripsi: e.target.value })} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs">Misi</label>
          <Textarea rows={2} value={state.about.misi} onChange={(e) => actions.updateAbout({ misi: e.target.value })} />
        </div>
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">Icon</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Desc</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {state.about.values.map((v) => (
              <tr key={v.title} className="border-t">
                <td className="p-3">
                  {(() => {
                    const Icon = icons[v.icon as keyof typeof icons] || Users;
                    return <Icon className="w-4 h-4" />;
                  })()}
                </td>
                <td className="p-3 font-medium">{v.title}</td>
                <td className="p-3 text-muted-foreground">{v.desc}</td>
                <td className="p-3 space-x-2">
                  <Button variant="outline" onClick={() => { setEditIdx(state.about.values.indexOf(v)); setValForm({ icon: v.icon, title: v.title, desc: v.desc }); setOpen(true); }}>Edit</Button>
                  <Button variant="destructive" onClick={() => actions.updateAbout({ values: state.about.values.filter((x) => x !== v) })}>Hapus</Button>
                </td>
              </tr>
            ))}
            {state.about.values.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted-foreground" colSpan={4}>Belum ada nilai</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Button onClick={() => { setEditIdx(null); setValForm({ icon: "Users", title: "", desc: "" }); setOpen(true); }}>Tambah Nilai</Button>

      <div className="space-y-3">
        <div className="text-sm font-semibold text-primary uppercase tracking-wider">Kenapa KerjaTim.id?</div>
        <h2 className="text-2xl font-bold">Solusi Outsourcing yang <span className="text-primary">Lebih Cerdas</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {state.benefits.map((b, i) => (
            <div
              key={b.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-5">
                {(() => {
                  const Icon = benefitIcons[b.icon as keyof typeof benefitIcons] || Shield;
                  return <Icon className="w-6 h-6 text-primary-foreground" />;
                })()}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editIdx !== null ? "Edit Nilai" : "Tambah Nilai"}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Icon</label>
              <Input value={valForm.icon} onChange={(e) => setValForm((f) => ({ ...f, icon: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs">Title</label>
              <Input value={valForm.title} onChange={(e) => setValForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs">Desc</label>
              <Textarea rows={3} value={valForm.desc} onChange={(e) => setValForm((f) => ({ ...f, desc: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Batal</Button>
            <Button onClick={() => {
              const next = [...state.about.values];
              if (editIdx !== null) next[editIdx] = { ...valForm };
              else next.unshift({ ...valForm });
              actions.updateAbout({ values: next });
              setOpen(false);
            }}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
