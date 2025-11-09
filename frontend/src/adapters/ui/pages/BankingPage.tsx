import { useState } from "react";
import { useBanking } from "../hooks/useBanking";

const BankingPage = () => {
  const [year, setYear] = useState(2025);
  const { cb, loading, bank, apply } = useBanking(year);

  if (loading) return <div className="p-6">Loading banking data...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Banking</h1>

      <div className="mb-4">
        <label className="mr-2">Year:</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border px-2 py-1 w-24"
        />
      </div>

      <div className="border rounded p-4 bg-gray-50 w-80">
        <p>CB Before: {cb?.cb_before}</p>
        <p>Applied: {cb?.applied}</p>
        <p>CB After: {cb?.cb_after}</p>
      </div>

      <div className="mt-4 flex gap-4">
        <button onClick={bank} className="bg-blue-600 text-white px-4 py-2 rounded">
          Bank Surplus
        </button>
        <button onClick={apply} className="bg-green-600 text-white px-4 py-2 rounded">
          Apply Surplus
        </button>
      </div>
    </div>
  );
};

export default BankingPage;
