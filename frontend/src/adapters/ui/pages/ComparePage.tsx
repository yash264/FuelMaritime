import { useCompare } from "../hooks/useCompare";

const ComparePage = () => {
  const { data, loading } = useCompare();

  if (loading)
    return (
      <div className="p-6 text-gray-600 animate-pulse">
        Loading comparison data...
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div className="p-6 text-gray-500 italic">
        No comparison data available.
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Compare Routes
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200 text-sm rounded-md overflow-hidden">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Route ID
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Baseline (tCO₂)
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Comparison (tCO₂)
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                % Difference
              </th>
              <th className="border-b px-4 py-2 text-left font-semibold">
                Compliant
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((r, i) => {
              const isImproved = r.percentDiff > 0; // ✅ Positive = improvement
              return (
                <tr
                  key={r.routeId}
                  className={`border-b ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-green-50 transition`}
                >
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {r.routeId}
                  </td>
                  <td className="px-4 py-2">{r.baseline.toFixed(2)}</td>
                  <td className="px-4 py-2">{r.comparison.toFixed(2)}</td>

                  {/* % Difference cell */}
                  <td
                    className={`px-4 py-2 font-semibold ${
                      isImproved
                        ? "text-green-600"
                        : r.percentDiff === 0
                        ? "text-gray-600"
                        : "text-red-600"
                    }`}
                  >
                    {r.percentDiff.toFixed(2)}%
                  </td>

                  {/* Compliant cell */}
                  <td className="px-4 py-2 text-lg">
                    {isImproved ? (
                      <span className="text-green-600">✅</span>
                    ) : (
                      <span className="text-red-600">❌</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;



