export default function DashboardTalentHome() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard Talent</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1F2937] p-6 rounded-xl">
          <p className="text-gray-400">Project Aktif</p>
          <h2 className="text-2xl font-bold">3</h2>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-xl">
          <p className="text-gray-400">Penghasilan Bulan Ini</p>
          <h2 className="text-2xl font-bold">Rp 8.500.000</h2>
        </div>

        <div className="bg-[#1F2937] p-6 rounded-xl">
          <p className="text-gray-400">Rating</p>
          <h2 className="text-2xl font-bold">4.8 ⭐</h2>
        </div>
      </div>
    </>
  );
}

