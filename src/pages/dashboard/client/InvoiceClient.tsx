export default function InvoiceClient() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Invoice</h1>
  
        <div className="bg-[#1F2937] p-6 rounded-xl">
          <p>Invoice Februari</p>
          <p className="text-gray-400">Rp 25.000.000</p>
          <button className="mt-3 bg-green-600 px-4 py-2 rounded-lg">
            Bayar Sekarang
          </button>
        </div>
      </div>
    );
  }