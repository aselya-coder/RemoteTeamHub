import { useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormModal } from "../components/FormModal";

export function About() {
  const { state, actions } = useAdminStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const form = document.getElementById("about-form") as HTMLFormElement;
    const formData = new FormData(form);

    const valuesString = formData.get("values") as string;
    const valuesLines = valuesString.split("\n").filter(Boolean);
    const values = valuesLines.map(line => {
      const [icon, title, ...descParts] = line.split("|").map(s => s.trim());
      return {
        icon: icon || "",
        title: title || "",
        desc: descParts.join("|") || "",
      };
    });

    await actions.updateAbout({
      judul: formData.get("judul") as string,
      deskripsi: formData.get("deskripsi") as string,
      visi: formData.get("visi") as string,
      misi: formData.get("misi") as string,
      values,
    });

    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">About</h1>
          <p className="text-muted-foreground">Manage about page content</p>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Content</Button>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">About Information</h2>
          <div className="space-y-2">
            <p><strong>Judul:</strong> {state.about.judul}</p>
            <p><strong>Deskripsi:</strong> {state.about.deskripsi}</p>
            <p><strong>Visi:</strong> {state.about.visi}</p>
            <p><strong>Misi:</strong> {state.about.misi}</p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Values</h2>
          <div className="space-y-4">
            {state.about.values.map((value, idx) => (
              <div key={idx} className="border-l-2 border-primary pl-4">
                <p><strong>{value.title}</strong> ({value.icon})</p>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FormModal
        open={isEditing}
        onOpenChange={setIsEditing}
        title="Edit About Page"
        onSubmit={handleSave}
      >
        <form id="about-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="judul">Judul *</Label>
            <Input id="judul" name="judul" defaultValue={state.about.judul} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi *</Label>
            <Textarea id="deskripsi" name="deskripsi" defaultValue={state.about.deskripsi} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="visi">Visi *</Label>
            <Input id="visi" name="visi" defaultValue={state.about.visi} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="misi">Misi *</Label>
            <Input id="misi" name="misi" defaultValue={state.about.misi} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="values">Values (one per line, format: icon|title|description) *</Label>
            <Textarea 
              id="values" 
              name="values" 
              rows={8}
              defaultValue={state.about.values.map(v => `${v.icon}|${v.title}|${v.desc}`).join("\n")}
              required 
            />
          </div>
        </form>
      </FormModal>
    </div>
  );
}
