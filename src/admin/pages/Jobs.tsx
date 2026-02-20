import { useState } from "react";
import { useAdminStore, Job } from "../store/useAdminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { ConfirmDelete } from "../components/ConfirmDelete";

export function Jobs() {
  const { state, actions } = useAdminStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Job | null>(null);
  const [editingItem, setEditingItem] = useState<Job | null>(null);

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Job) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (item: Job) => {
    setDeleteItem(item);
  };

  const confirmDelete = async () => {
    if (deleteItem) {
      await actions.deleteJob(deleteItem.id);
      setDeleteItem(null);
    }
  };

  const handleSave = async () => {
    const form = document.getElementById("job-form") as HTMLFormElement;
    const formData = new FormData(form);

    const jobData: Job = {
      id: editingItem?.id || `job${Date.now()}`,
      posisi: formData.get("posisi") as string,
      perusahaan: formData.get("perusahaan") as string,
      lokasi: formData.get("lokasi") as string,
      tipe_kerja: formData.get("tipe_kerja") as string,
      gaji: formData.get("gaji") as string,
      deskripsi: formData.get("deskripsi") as string || undefined,
    };

    if (editingItem) {
      await actions.updateJob(editingItem.id, jobData);
    } else {
      await actions.addJob(jobData);
    }

    setIsModalOpen(false);
    setEditingItem(null);
  };

  const columns = [
    { key: "posisi", header: "Posisi" },
    { key: "perusahaan", header: "Perusahaan" },
    { key: "lokasi", header: "Lokasi" },
    { key: "tipe_kerja", header: "Tipe Kerja" },
    { key: "gaji", header: "Gaji" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Jobs</h1>
          <p className="text-muted-foreground">Manage job listings</p>
        </div>
        <Button onClick={handleAdd}>Add Job</Button>
      </div>

      <DataTable
        data={state.jobs}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <FormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title={editingItem ? "Edit Job" : "Add Job"}
        onSubmit={handleSave}
      >
        <form id="job-form" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="posisi">Posisi *</Label>
            <Input id="posisi" name="posisi" defaultValue={editingItem?.posisi} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="perusahaan">Perusahaan *</Label>
            <Input id="perusahaan" name="perusahaan" defaultValue={editingItem?.perusahaan} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lokasi">Lokasi *</Label>
            <Input id="lokasi" name="lokasi" defaultValue={editingItem?.lokasi} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipe_kerja">Tipe Kerja *</Label>
            <Input id="tipe_kerja" name="tipe_kerja" defaultValue={editingItem?.tipe_kerja} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gaji">Gaji *</Label>
            <Input id="gaji" name="gaji" defaultValue={editingItem?.gaji} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea id="deskripsi" name="deskripsi" defaultValue={editingItem?.deskripsi} />
          </div>
        </form>
      </FormModal>

      <ConfirmDelete
        open={!!deleteItem}
        onOpenChange={(open) => !open && setDeleteItem(null)}
        onConfirm={confirmDelete}
        title="Delete Job"
        description={`Are you sure you want to delete ${deleteItem?.posisi}?`}
      />
    </div>
  );
}
