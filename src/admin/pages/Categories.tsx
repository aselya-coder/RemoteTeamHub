import { useState } from "react";
import { useAdminStore, Category } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { ConfirmDelete } from "../components/ConfirmDelete";

export function Categories() {
  const { state, actions } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Category | null>(null);
  const [editingItem, setEditingItem] = useState<Category | null>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Category) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Category) => {
    setDeleteItem(item);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      await actions.deleteCategory(deleteItem.id);
      setDeleteItem(null);
    }
  };

  const handleSave = async () => {
    const form = document.getElementById("category-form") as HTMLFormElement;
    const formData = new FormData(form);

    const bulletsString = formData.get("bullets") as string;
    const bullets = bulletsString ? bulletsString.split(",").map(s => s.trim()).filter(Boolean) : undefined;

    const categoryData: Category = {
      id: editingItem?.id || `cat${Date.now()}`,
      slug: formData.get("slug") as string,
      nama: formData.get("nama") as string,
      icon: formData.get("icon") as string,
      deskripsi: formData.get("deskripsi") as string,
      harga: formData.get("harga") as string,
      bullets,
    };

    if (editingItem) {
      await actions.updateCategory(editingItem.id, categoryData);
    } else {
      await actions.addCategory(categoryData);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const columns = [
    { key: "nama", header: "Nama" },
    { key: "slug", header: "Slug" },
    { key: "icon", header: "Icon" },
    { key: "harga", header: "Harga" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-muted-foreground">Manage talent categories</p>
        </div>
        <Button onClick={handleAdd}>Add Category</Button>
      </div>

      <DataTable
        data={state.categories}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingItem ? "Edit Category" : "Add Category"}
        onSubmit={handleSave}
      >
        <form id="category-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama">Nama *</Label>
            <Input id="nama" name="nama" defaultValue={editingItem?.nama} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input id="slug" name="slug" defaultValue={editingItem?.slug} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="icon">Icon (Lucide icon name) *</Label>
            <Input id="icon" name="icon" defaultValue={editingItem?.icon} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi *</Label>
            <Textarea id="deskripsi" name="deskripsi" defaultValue={editingItem?.deskripsi} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="harga">Harga *</Label>
            <Input id="harga" name="harga" defaultValue={editingItem?.harga} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bullets">Bullets (comma separated)</Label>
            <Input id="bullets" name="bullets" defaultValue={editingItem?.bullets?.join(", ")} />
          </div>
        </form>
      </FormModal>

      <ConfirmDelete
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete Category"
        description={`Are you sure you want to delete ${deleteItem?.nama}?`}
      />
    </div>
  );
}
