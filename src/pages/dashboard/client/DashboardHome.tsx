export default function DashboardHome() {
    return (
      <>
        <h1 className="text-2xl font-bold mb-6">Dashboard Client</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  
          <div className="bg-[#1F2937] p-6 rounded-xl shadow">
            <p className="text-gray-400">Tenaga Kerja Aktif</p>
            <h2 className="text-2xl font-bold">12</h2>
          </div>
  
          <div className="bg-[#1F2937] p-6 rounded-xl shadow">
            <p className="text-gray-400">Tagihan Bulan Ini</p>
            <h2 className="text-2xl font-bold">Rp 25.000.000</h2>
          </div>
  
          <div className="bg-[#1F2937] p-6 rounded-xl shadow">
            <p className="text-gray-400">Kontrak Aktif</p>
            <h2 className="text-2xl font-bold">5</h2>
          </div>
  
        </div>
      </>
    );
  }