import { useState } from "react";
import { usePooling } from "../hooks/usePooling";

const PoolingPage = () => {
  const [year, setYear] = useState(2025);
  const { members, loading, createPool, poolSum, valid } = usePooling(year);

  if (loading) return <div className="p-6">Loading pooling data...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pooling</h1>

      <table className="min-w-full border border-gray-300 text-sm mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Ship ID</th>
            <th className="border px-3 py-2">CB Before</th>
            <th className="border px-3 py-2">CB After</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.shipId}>
              <td className="px-3 py-2">{m.shipId}</td>
              <td className="px-3 py-2">{m.cb_before}</td>
              <td className="px-3 py-2">{m.cb_after ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        Pool Sum:{" "}
        <span className={valid ? "text-green-600" : "text-red-600"}>
          {poolSum.toFixed(2)} {valid ? "(Valid)" : "(Invalid)"}
        </span>
      </p>

      <button
        onClick={createPool}
        disabled={!valid}
        className={`mt-4 px-4 py-2 rounded ${
          valid
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        Create Pool
      </button>
    </div>
  );
};

export default PoolingPage;
