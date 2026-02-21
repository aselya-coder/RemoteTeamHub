export default function SettingsClient() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>
  
        <div className="bg-[#1F2937] p-6 rounded-xl space-y-4">
          <input className="w-full p-3 bg-[#111827] rounded-lg" placeholder="Nama Perusahaan" />
          <input className="w-full p-3 bg-[#111827] rounded-lg" placeholder="Email" />
          <button className="bg-blue-600 px-4 py-2 rounded-lg">Simpan</button>
        </div>
      </div>
    );
  }