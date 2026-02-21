export default function CariTalent() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Cari Talent</h1>
  
        <div className="bg-[#1F2937] p-6 rounded-xl">
          <p className="text-gray-400 mb-2">Filter Talent</p>
  
          <input
            type="text"
            placeholder="Cari skill (React, Admin, Design...)"
            className="w-full p-3 rounded-lg bg-[#111827] border border-gray-700"
          />
        </div>
  
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-[#1F2937] p-4 rounded-xl">
            <h3 className="font-bold">UI Designer</h3>
            <p className="text-gray-400">Rp 5 - 8 juta / bulan</p>
            <button className="mt-3 bg-blue-600 px-4 py-2 rounded-lg">Hire</button>
          </div>
        </div>
      </div>
    );
  }