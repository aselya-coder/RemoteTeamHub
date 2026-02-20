import { useState } from "react";
import { useAdminStore, Pricing } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { ConfirmDelete } from "../components/ConfirmDelete";

export function PricingPage() {
  const { state, actions } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Pricing | null>(null);
  const [editingItem, setEditingItem] = useState<Pricing | null>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Pricing) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Pricing) => {
    setDeleteItem(item);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      await actions.deletePricing(deleteItem.id);
      setDeleteItem(null);
    }
  };

  const handleSave = async () => {
    const form = document.getElementById("pricing-form") as HTMLFormElement;
    const formData = new FormData(form);

    const fiturString = formData.get("fitur") as string;
    const fitur = fiturString.split("\n").map(s => s.trim()).filter(Boolean);

    const pricingData: Pricing = {
      id: editingItem?.id || `p${Date.now()}`,
      nama_paket: formData.get("nama_paket") as string,
      harga: formData.get("harga") as string,
      fitur,
      highlight: formData.get("highlight") === "on",
      periode: formData.get("periode") as string || undefined,
      deskripsi: formData.get("deskripsi") as string || undefined,
    };

    if (editingItem) {
      await actions.updatePricing(editingItem.id, pricingData);
    } else {
      await actions.addPricing(pricingData);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const columns = [
    { key: "nama_paket", header: "Nama Paket" },
    { key: "harga", header: "Harga" },
    { key: "periode", header: "Periode" },
    { 
      key: "highlight", 
      header: "Highlight",
      render: (item: Pricing) => item.highlight ? "Yes" : "No"
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pricing</h1>
          <p className="text-muted-foreground">Manage pricing plans</p>
        </div>
        <Button onClick={handleAdd}>Add Pricing</Button>
      </div>

      <DataTable
        data={state.pricing}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingItem ? "Edit Pricing" : "Add Pricing"}
        onSubmit={handleSave}
      >
        <form id="pricing-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama_paket">Nama Paket *</Label>
            <Input id="nama_paket" name="nama_paket" defaultValue={editingItem?.nama_paket} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="harga">Harga *</Label>
            <Input id="harga" name="harga" defaultValue={editingItem?.harga} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="periode">Periode</Label>
            <Input id="periode" name="periode" defaultValue={editingItem?.periode} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea id="deskripsi" name="deskripsi" defaultValue={editingItem?.deskripsi} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fitur">Fitur (one per line) *</Label>
            <Textarea 
              id="fitur" 
              name="fitur" 
              rows={6}
              defaultValue={editingItem?.fitur.join("\n")}
              required 
            />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="highlight" name="highlight" defaultChecked={editingItem?.highlight} className="w-4 h-4" />
            <Label htmlFor="highlight" className="cursor-pointer">Highlight (Popular)</Label>
          </div>
        </form>
      </FormModal>

      <ConfirmDelete
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete Pricing"
        description={`Are you sure you want to delete ${deleteItem?.nama_paket}?`}
      />
    </div>
  );
}
