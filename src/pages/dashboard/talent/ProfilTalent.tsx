export default function ProfilTalent() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Profil Saya</h1>
  
        <div className="bg-[#1F2937] p-6 rounded-xl space-y-4">
          <input className="w-full p-3 bg-[#111827] rounded-lg" placeholder="Nama Lengkap" />
          <input className="w-full p-3 bg-[#111827] rounded-lg" placeholder="Skill Utama" />
          <button className="bg-blue-600 px-4 py-2 rounded-lg">Update Profil</button>
        </div>
      </div>
    );
  }