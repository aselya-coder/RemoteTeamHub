import { useState } from "react";
import CariTalent from "./CariTalent";
import InvoiceClient from "./InvoiceClient";
import KontrakClient from "./KontrakClient";
import SettingsClient from "./SettingsClient";

export default function DashboardClient() {
  const [menu, setMenu] = useState("dashboard");

  return (
    <div className="min-h-screen flex bg-[#0F172A] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111827] p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Client Panel</h2>

        <ul className="space-y-3 text-gray-300">
          <li onClick={() => setMenu("dashboard")} className="cursor-pointer">Dashboard</li>
          <li onClick={() => setMenu("cari")} className="cursor-pointer">Cari Talent</li>
          <li onClick={() => setMenu("kontrak")} className="cursor-pointer">Kontrak Aktif</li>
          <li onClick={() => setMenu("invoice")} className="cursor-pointer">Invoice</li>
          <li onClick={() => setMenu("settings")} className="cursor-pointer">Pengaturan</li>
        </ul>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">

        {menu === "dashboard" && (
          <>
            <h1 className="text-2xl font-bold mb-6">Dashboard Client</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#1F2937] p-6 rounded-xl">
                <p className="text-gray-400">Tenaga Kerja Aktif</p>
                <h2 className="text-2xl font-bold">12</h2>
              </div>

              <div className="bg-[#1F2937] p-6 rounded-xl">
                <p className="text-gray-400">Tagihan Bulan Ini</p>
                <h2 className="text-2xl font-bold">Rp 25.000.000</h2>
              </div>

              <div className="bg-[#1F2937] p-6 rounded-xl">
                <p className="text-gray-400">Kontrak Aktif</p>
                <h2 className="text-2xl font-bold">5</h2>
              </div>
            </div>
          </>
        )}

        {menu === "cari" && <CariTalent />}
        {menu === "kontrak" && <KontrakClient />}
        {menu === "invoice" && <InvoiceClient />}
        {menu === "settings" && <SettingsClient />}

      </main>
    </div>
  );
}