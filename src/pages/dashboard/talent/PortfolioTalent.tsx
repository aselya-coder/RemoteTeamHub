export default function PortfolioTalent() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
  
        <div className="bg-[#1F2937] p-6 rounded-xl">
          <input type="file" className="mb-3" />
          <button className="bg-blue-600 px-4 py-2 rounded-lg">
            Upload Portfolio
          </button>
        </div>
      </div>
    );
  }