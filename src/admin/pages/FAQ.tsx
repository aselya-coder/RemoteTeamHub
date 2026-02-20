import { useState } from "react";
import { useAdminStore, FAQ } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { ConfirmDelete } from "../components/ConfirmDelete";

export function FAQ() {
  const { state, actions } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<FAQ | null>(null);
  const [editingItem, setEditingItem] = useState<FAQ | null>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: FAQ) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: FAQ) => {
    setDeleteItem(item);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      await actions.deleteFAQ(deleteItem.id);
      setDeleteItem(null);
    }
  };

  const handleSave = async () => {
    const form = document.getElementById("faq-form") as HTMLFormElement;
    const formData = new FormData(form);

    const faqData: FAQ = {
      id: editingItem?.id || `f${Date.now()}`,
      pertanyaan: formData.get("pertanyaan") as string,
      jawaban: formData.get("jawaban") as string,
    };

    if (editingItem) {
      await actions.updateFAQ(editingItem.id, faqData);
    } else {
      await actions.addFAQ(faqData);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const columns = [
    { key: "pertanyaan", header: "Pertanyaan" },
    { 
      key: "jawaban", 
      header: "Jawaban",
      render: (item: FAQ) => item.jawaban.substring(0, 100) + "..."
    },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">FAQ</h1>
          <p className="text-muted-foreground">Manage frequently asked questions</p>
        </div>
        <Button onClick={handleAdd}>Add FAQ</Button>
      </div>

      <DataTable
        data={state.faq}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingItem ? "Edit FAQ" : "Add FAQ"}
        onSubmit={handleSave}
      >
        <form id="faq-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pertanyaan">Pertanyaan *</Label>
            <Textarea id="pertanyaan" name="pertanyaan" rows={2} defaultValue={editingItem?.pertanyaan} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jawaban">Jawaban *</Label>
            <Textarea id="jawaban" name="jawaban" rows={4} defaultValue={editingItem?.jawaban} required />
          </div>
        </form>
      </FormModal>

      <ConfirmDelete
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete FAQ"
        description="Are you sure you want to delete this FAQ?"
      />
    </div>
  );
}
