import { useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormModal } from "../components/FormModal";

export function Contacts() {
  const { state, actions } = useAdminStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const form = document.getElementById("contacts-form") as HTMLFormElement;
    const formData = new FormData(form);

    await actions.updateContacts({
      email: formData.get("email") as string,
      whatsapp: formData.get("whatsapp") as string,
      alamat: formData.get("alamat") as string,
      telepon: formData.get("telepon") as string || undefined,
    });

    setIsEditing(false);
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contacts</h1>
          <p className="text-muted-foreground">Manage contact information</p>
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit Contacts</Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{state.contacts.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">WhatsApp</p>
          <p className="font-medium">{state.contacts.whatsapp}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Alamat</p>
          <p className="font-medium">{state.contacts.alamat}</p>
        </div>
        {state.contacts.telepon && (
          <div>
            <p className="text-sm text-muted-foreground">Telepon</p>
            <p className="font-medium">{state.contacts.telepon}</p>
          </div>
        )}
      </div>

      <FormModal
        open={isEditing}
        onOpenChange={setIsEditing}
        title="Edit Contacts"
        onSubmit={handleSave}
      >
        <form id="contacts-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" defaultValue={state.contacts.email} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp *</Label>
            <Input id="whatsapp" name="whatsapp" defaultValue={state.contacts.whatsapp} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alamat">Alamat *</Label>
            <Input id="alamat" name="alamat" defaultValue={state.contacts.alamat} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telepon">Telepon</Label>
            <Input id="telepon" name="telepon" defaultValue={state.contacts.telepon} />
          </div>
        </form>
      </FormModal>
    </div>
  );
}
