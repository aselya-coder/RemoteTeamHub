import { useState } from "react";
import { useAdminStore, Blog } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { ConfirmDelete } from "../components/ConfirmDelete";

export function Blogs() {
  const { state, actions } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Blog | null>(null);
  const [editingItem, setEditingItem] = useState<Blog | null>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Blog) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Blog) => {
    setDeleteItem(item);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      await actions.deleteBlog(deleteItem.id);
      setDeleteItem(null);
    }
  };

  const handleSave = async () => {
    const form = document.getElementById("blog-form") as HTMLFormElement;
    const formData = new FormData(form);

    const blogData: Blog = {
      id: editingItem?.id || `b${Date.now()}`,
      judul: formData.get("judul") as string,
      thumbnail: formData.get("thumbnail") as string || undefined,
      konten: formData.get("konten") as string,
      author: formData.get("author") as string,
      tanggal: formData.get("tanggal") as string,
      category: formData.get("category") as string || undefined,
    };

    if (editingItem) {
      await actions.updateBlog(editingItem.id, blogData);
    } else {
      await actions.addBlog(blogData);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const columns = [
    { key: "judul", header: "Judul" },
    { key: "author", header: "Author" },
    { key: "tanggal", header: "Tanggal" },
    { key: "category", header: "Category" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blogs</h1>
          <p className="text-muted-foreground">Manage blog posts</p>
        </div>
        <Button onClick={handleAdd}>Add Blog</Button>
      </div>

      <DataTable
        data={state.blogs}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingItem ? "Edit Blog" : "Add Blog"}
        onSubmit={handleSave}
      >
        <form id="blog-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="judul">Judul *</Label>
            <Input id="judul" name="judul" defaultValue={editingItem?.judul} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input id="thumbnail" name="thumbnail" type="url" defaultValue={editingItem?.thumbnail} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="konten">Konten *</Label>
            <Textarea id="konten" name="konten" rows={6} defaultValue={editingItem?.konten} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input id="author" name="author" defaultValue={editingItem?.author} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tanggal">Tanggal *</Label>
            <Input id="tanggal" name="tanggal" defaultValue={editingItem?.tanggal} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" name="category" defaultValue={editingItem?.category} />
          </div>
        </form>
      </FormModal>

      <ConfirmDelete
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete Blog"
        description={`Are you sure you want to delete ${deleteItem?.judul}?`}
      />
    </div>
  );
}
