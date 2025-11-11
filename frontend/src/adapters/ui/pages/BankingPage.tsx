import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useBanking } from "../hooks/useBanking";

const routes = [
  { id: "R001", name: "Container (HFO)" },
  { id: "R002", name: "BulkCarrier (LNG)" },
  { id: "R003", name: "Tanker (MGO)" },
  { id: "R004", name: "RoRo (HFO)" },
  { id: "R005", name: "Container (LNG)" },
];

const BankingPage = () => {
  const [routeId, setRouteId] = useState("R001");
  const [year, setYear] = useState(2025);

  const { cb, loading, error, bank, apply } = useBanking(routeId, year);

  const disableActions = !cb || cb.cb_before <= 0;

  if (loading) return <div className="p-6">Loading banking data...</div>;
  // if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Banking</h1>

      <div className="mb-4 flex gap-4 items-center">
        <div>
          <label className="mr-2">Route:</label>
          <select
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
            className="border px-2 py-1"
          >
            {routes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id} - {r.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2">Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="border px-2 py-1 w-24"
          />
        </div>
      </div>

      <div className="border rounded p-4 bg-gray-50 w-80">
        <p>CB Before: {cb?.cb_before}</p>
        <p>Applied: {cb?.applied}</p>
        <p>CB After: {cb?.cb_after}</p>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={async () => {
            toast.loading("Banking surplus...");
            try {
              await bank();
              toast.dismiss();
              toast.success("Surplus successfully banked!");
            } catch {
              toast.dismiss();
              toast.error("Banking failed");
            }
          }}
          disabled={disableActions}
          className={`px-4 py-2 rounded text-white ${
            disableActions
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Bank Surplus
        </button>

        <button
          onClick={async () => {
            toast.loading("Applying surplus...");
            try {
              await apply();
              toast.dismiss();
              toast.success("Surplus successfully applied!");
            } catch {
              toast.dismiss();
              toast.error("Apply failed");
            }
          }}
          disabled={disableActions}
          className={`px-4 py-2 rounded text-white ${
            disableActions
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Apply Surplus
        </button>
      </div>
    </div>
  );
};

export default BankingPage;


