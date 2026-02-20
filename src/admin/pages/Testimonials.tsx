import { useState } from "react";
import { useAdminStore, Testimonial } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { ConfirmDelete } from "../components/ConfirmDelete";

export function Testimonials() {
  const { state, actions } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Testimonial | null>(null);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Testimonial) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Testimonial) => {
    setDeleteItem(item);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      await actions.deleteTestimonial(deleteItem.id);
      setDeleteItem(null);
    }
  };

  const handleSave = async () => {
    const form = document.getElementById("testimonial-form") as HTMLFormElement;
    const formData = new FormData(form);

    const testimonialData: Testimonial = {
      id: editingItem?.id || `t${Date.now()}`,
      nama: formData.get("nama") as string,
      jabatan: formData.get("jabatan") as string,
      isi_testimoni: formData.get("isi_testimoni") as string,
      foto: formData.get("foto") as string || undefined,
      rating: formData.get("rating") ? Number(formData.get("rating")) : undefined,
    };

    if (editingItem) {
      await actions.updateTestimonial(editingItem.id, testimonialData);
    } else {
      await actions.addTestimonial(testimonialData);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const columns = [
    { key: "nama", header: "Nama" },
    { key: "jabatan", header: "Jabatan" },
    { 
      key: "isi_testimoni", 
      header: "Testimoni",
      render: (item: Testimonial) => item.isi_testimoni.substring(0, 50) + "..."
    },
    { key: "rating", header: "Rating" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Testimonials</h1>
          <p className="text-muted-foreground">Manage customer testimonials</p>
        </div>
        <Button onClick={handleAdd}>Add Testimonial</Button>
      </div>

      <DataTable
        data={state.testimonials}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingItem ? "Edit Testimonial" : "Add Testimonial"}
        onSubmit={handleSave}
      >
        <form id="testimonial-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama">Nama *</Label>
            <Input id="nama" name="nama" defaultValue={editingItem?.nama} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jabatan">Jabatan *</Label>
            <Input id="jabatan" name="jabatan" defaultValue={editingItem?.jabatan} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="isi_testimoni">Isi Testimoni *</Label>
            <Textarea id="isi_testimoni" name="isi_testimoni" rows={4} defaultValue={editingItem?.isi_testimoni} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="foto">Foto URL</Label>
            <Input id="foto" name="foto" type="url" defaultValue={editingItem?.foto} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input id="rating" name="rating" type="number" min="1" max="5" defaultValue={editingItem?.rating} />
          </div>
        </form>
      </FormModal>

      <ConfirmDelete
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete Testimonial"
        description={`Are you sure you want to delete ${deleteItem?.nama}'s testimonial?`}
      />
    </div>
  );
}
