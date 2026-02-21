export default function Register() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        <div className="bg-[#111827] p-8 rounded-2xl w-full max-w-md shadow-xl">
          <h1 className="text-2xl font-bold mb-2">Daftar Akun</h1>
          <p className="text-gray-400 mb-6">
            Buat akun sebagai Client atau Talent
          </p>
  
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full mb-4 p-3 rounded bg-[#1F2937]"
          />
  
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-3 rounded bg-[#1F2937]"
          />
  
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded bg-[#1F2937]"
          />
  
          <select className="w-full mb-4 p-3 rounded bg-[#1F2937]">
            <option>Daftar sebagai Client</option>
            <option>Daftar sebagai Talent</option>
          </select>
  
          <button className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold">
            Daftar
          </button>
        </div>
      </div>
    );
  }