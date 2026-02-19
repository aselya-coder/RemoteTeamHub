import { useAdminStore } from "@/admin/store/useAdminStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminContacts() {
  const { state, actions } = useAdminStore();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Contacts</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs">Email</label>
          <Input value={state.contacts.email} onChange={(e) => actions.updateContacts({ email: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-xs">Telepon</label>
          <Input value={state.contacts.telepon || ""} onChange={(e) => actions.updateContacts({ telepon: e.target.value })} />
        </div>
        <div className="space-y-2">
          <label className="text-xs">WhatsApp</label>
          <Input value={state.contacts.whatsapp} onChange={(e) => actions.updateContacts({ whatsapp: e.target.value })} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs">Alamat</label>
          <Input value={state.contacts.alamat} onChange={(e) => actions.updateContacts({ alamat: e.target.value })} />
        </div>
      </div>
      <Button variant="outline" disabled>
        Disimpan Otomatis
      </Button>
    </div>
  );
}
