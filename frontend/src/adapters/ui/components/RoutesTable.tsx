import { useState, useMemo } from "react";
import toast from "react-hot-toast";

export interface RouteData {
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distance: number;
  totalEmissions: number;
}

interface Props {
  routes: RouteData[];
  onSetBaseline: (routeId: string) => void;
}

const RoutesTable = ({ routes, onSetBaseline }: Props) => {
  // 🔹 Filter states
  const [vesselFilter, setVesselFilter] = useState("");
  const [fuelFilter, setFuelFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  // 🔹 Unique filter options
  const vesselTypes = useMemo(
    () => Array.from(new Set(routes.map((r) => r.vesselType))),
    [routes]
  );
  const fuelTypes = useMemo(
    () => Array.from(new Set(routes.map((r) => r.fuelType))),
    [routes]
  );
  const years = useMemo(
    () => Array.from(new Set(routes.map((r) => r.year))),
    [routes]
  );

  // 🔹 Apply filters
  const filteredRoutes = useMemo(() => {
    return routes.filter((r) => {
      const vesselMatch = vesselFilter ? r.vesselType === vesselFilter : true;
      const fuelMatch = fuelFilter ? r.fuelType === fuelFilter : true;
      const yearMatch = yearFilter ? r.year.toString() === yearFilter : true;
      return vesselMatch && fuelMatch && yearMatch;
    });
  }, [routes, vesselFilter, fuelFilter, yearFilter]);

  // 🔹 Handle baseline click
  const handleSetBaseline = async (routeId: string) => {
    toast.loading("Setting baseline...");
    try {
      await onSetBaseline(routeId);
      toast.dismiss();
      toast.success(`Baseline set successfully for route ${routeId}!`);
    } catch {
      toast.dismiss();
      toast.error("Failed to set baseline. Please try again.");
    }
  };

  // 🔹 Clear filters
  const clearFilters = () => {
    setVesselFilter("");
    setFuelFilter("");
    setYearFilter("");
  };

  return (
    <div className="mt-6 bg-white shadow-md rounded-lg p-4 sm:p-6">
      {/* 🔹 Filters */}
      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div className="flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Vessel Type
          </label>
          <select
            value={vesselFilter}
            onChange={(e) => setVesselFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
          >
            <option value="">All</option>
            {vesselTypes.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Fuel Type
          </label>
          <select
            value={fuelFilter}
            onChange={(e) => setFuelFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
          >
            <option value="">All</option>
            {fuelTypes.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[140px]">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Year
          </label>
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none"
          >
            <option value="">All</option>
            {years.map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={clearFilters}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md font-medium transition"
        >
          Clear Filters
        </button>
      </div>

      {/* 🔹 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm rounded-md overflow-hidden">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              {[
                "Route ID",
                "Vessel Type",
                "Fuel Type",
                "Year",
                "GHG Intensity",
                "Fuel (t)",
                "Distance (km)",
                "Emissions (t)",
                "Action",
              ].map((header) => (
                <th
                  key={header}
                  className="border-b border-gray-200 px-4 py-2 text-left font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRoutes.map((r, i) => (
              <tr
                key={r.routeId}
                className={`border-b ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50 transition-colors`}
              >
                <td className="px-4 py-2 font-medium">{r.routeId}</td>
                <td className="px-4 py-2">{r.vesselType}</td>
                <td className="px-4 py-2">{r.fuelType}</td>
                <td className="px-4 py-2">{r.year}</td>
                <td className="px-4 py-2">{r.ghgIntensity}</td>
                <td className="px-4 py-2">{r.fuelConsumption}</td>
                <td className="px-4 py-2">{r.distance}</td>
                <td className="px-4 py-2">{r.totalEmissions}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleSetBaseline(r.routeId)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition text-xs sm:text-sm"
                  >
                    Set Baseline
                  </button>
                </td>
              </tr>
            ))}

            {filteredRoutes.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="text-center text-gray-500 py-6 italic bg-gray-50"
                >
                  No routes match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoutesTable;

