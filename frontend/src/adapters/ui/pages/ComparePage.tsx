import { useCompare } from "../hooks/useCompare";

const ComparePage = () => {
  const { data, loading } = useCompare();

  if (loading) return <div className="p-6">Loading comparison data...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Compare Routes</h1>
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Route ID</th>
            <th className="border px-3 py-2">Baseline</th>
            <th className="border px-3 py-2">Comparison</th>
            <th className="border px-3 py-2">% Difference</th>
            <th className="border px-3 py-2">Compliant</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.routeId}>
              <td className="px-3 py-2">{r.routeId}</td>
              <td className="px-3 py-2">{r.baseline.toFixed(2)}</td>
              <td className="px-3 py-2">{r.comparison.toFixed(2)}</td>
              <td className="px-3 py-2">{r.percentDiff.toFixed(2)}%</td>
              <td className="px-3 py-2">{r.compliant ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparePage;

