import { useState } from "react";
import { useAdminStore, Talent } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { ConfirmDelete } from "../components/ConfirmDelete";

export function Talents() {
  const { state, actions } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Talent | null>(null);
  const [editingItem, setEditingItem] = useState<Talent | null>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Talent) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Talent) => {
    setDeleteItem(item);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      await actions.deleteTalent(deleteItem.id);
      setDeleteItem(null);
    }
  };

  const handleSave = async () => {
    const form = document.getElementById("talent-form") as HTMLFormElement;
    const formData = new FormData(form);
    
    const skillString = formData.get("skill") as string;
    const skills = skillString.split(",").map(s => s.trim()).filter(Boolean);

    const talentData: Talent = {
      id: editingItem?.id || `tal${Date.now()}`,
      nama: formData.get("nama") as string,
      foto: formData.get("foto") as string || undefined,
      skill: skills,
      kategori: formData.get("kategori") as string,
      lokasi: formData.get("lokasi") as string,
      rate: formData.get("rate") as string,
      deskripsi: formData.get("deskripsi") as string || undefined,
      kontak: formData.get("kontak") as string || undefined,
    };

    if (editingItem) {
      await actions.updateTalent(editingItem.id, talentData);
    } else {
      await actions.addTalent(talentData);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const columns = [
    { key: "nama", header: "Nama" },
    { key: "kategori", header: "Kategori" },
    { key: "lokasi", header: "Lokasi" },
    { key: "rate", header: "Rate" },
    { 
      key: "skill", 
      header: "Skills",
      render: (item: Talent) => item.skill.join(", ")
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Talents</h1>
          <p className="text-muted-foreground">Manage talent profiles</p>
        </div>
        <Button onClick={handleAdd}>Add Talent</Button>
      </div>

      <DataTable
        data={state.talents}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingItem ? "Edit Talent" : "Add Talent"}
        onSubmit={handleSave}
      >
        <form id="talent-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama">Nama *</Label>
            <Input id="nama" name="nama" defaultValue={editingItem?.nama} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="foto">Foto URL</Label>
            <Input id="foto" name="foto" type="url" defaultValue={editingItem?.foto} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="skill">Skills (comma separated) *</Label>
            <Input id="skill" name="skill" defaultValue={editingItem?.skill.join(", ")} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kategori">Kategori *</Label>
            <Input id="kategori" name="kategori" defaultValue={editingItem?.kategori} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lokasi">Lokasi *</Label>
            <Input id="lokasi" name="lokasi" defaultValue={editingItem?.lokasi} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Rate *</Label>
            <Input id="rate" name="rate" defaultValue={editingItem?.rate} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea id="deskripsi" name="deskripsi" defaultValue={editingItem?.deskripsi} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="kontak">Kontak</Label>
            <Input id="kontak" name="kontak" defaultValue={editingItem?.kontak} />
          </div>
        </form>
      </FormModal>

      <ConfirmDelete
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete Talent"
        description={`Are you sure you want to delete ${deleteItem?.nama}?`}
      />
    </div>
  );
}
